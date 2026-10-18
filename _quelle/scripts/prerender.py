"""Rendert jede Route der gebauten Vite-App zu statischem HTML (out/<route>/index.html)
und erzeugt robots.txt, sitemap.xml, llms.txt, llms-full.txt sowie vercel.json.

Aufruf (aus dem Projektordner):  npm run build && python3 scripts/prerender.py
"""
import json, html, re, subprocess, time, datetime, pathlib, socket
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
CFG = json.loads((ROOT / "src/seo/pages.json").read_text())
SITE = CFG["siteUrl"].rstrip("/")
NAME = CFG["siteName"]
TODAY = datetime.date.today().isoformat()

BIZ_ID = f"{SITE}/#business"
BUSINESS = {
    "@type": "AutomotiveBusiness",
    "@id": BIZ_ID,
    "name": NAME,
    "alternateName": "FSP Prüfstützpunkt Staig",
    "description": "TÜV-Rheinland-zertifizierter FSP-Prüfstützpunkt für Hauptuntersuchung, Änderungsabnahmen, Oldtimergutachten, Gasprüfungen und Fahrzeuggutachten in Staig/Steinberg.",
    "url": f"{SITE}/",
    "logo": f"{SITE}/images/logo.png",
    "image": f"{SITE}/og-image.jpg",
    "telephone": "+49 7305 9357646",
    "contactPoint": [
        {"@type": "ContactPoint", "telephone": "+49 7305 9357646", "contactType": "customer service", "availableLanguage": "German"},
        {"@type": "ContactPoint", "telephone": "+49 179 5677777", "contactType": "customer service", "availableLanguage": "German"},
    ],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gassenäcker N 8",
        "postalCode": "89195",
        "addressLocality": "Staig",
        "addressRegion": "Baden-Württemberg",
        "addressCountry": "DE",
    },
    "hasMap": "https://www.google.com/maps/place//data=!4m2!3m1!1s0x479961fbf591de99:0xb9befdd7a62ba20f",
    "areaServed": [{"@type": "City", "name": n} for n in ["Staig", "Steinberg", "Ulm", "Neu-Ulm", "Illerkirchberg", "Schnürpflingen"]],
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "knowsAbout": ["Hauptuntersuchung", "Änderungsabnahme", "Oldtimergutachten", "Gasprüfung", "Schadengutachten", "Wertgutachten"],
}

PRICES = [
    ("Hauptuntersuchung (HU) Pkw", 95), ("Hauptuntersuchung (HU) Lkw bis 3,5 t", 120),
    ("Sicherheitsprüfung (AU) Pkw", 35), ("Sicherheitsprüfung (AU) Lkw", 55),
    ("Änderungsabnahme §19(3) StVZO", 85), ("BOKraft-Prüfung", 75), ("Feinstaubplakette", 15),
    ("Tempo 100 Zulassung Anhänger", 65), ("Oldtimergutachten §23 StVZO", 180), ("Oldtimerwertgutachten", 250),
    ("Begutachtung Fahrzeugidentität", 150), ("Gasprüfung GAP/GWP", 95), ("Gasprüfung Wohnmobile G607", 120),
    ("Schaden- und Wertgutachten", 200), ("UVV / Betriebssicherheitsprüfung", 150),
]


def url_of(path):
    return f"{SITE}/" if path == "/" else f"{SITE}{path}"


def jsonld(path, meta):
    graph = [
        {"@type": "WebSite", "@id": f"{SITE}/#website", "url": f"{SITE}/", "name": NAME, "inLanguage": "de-DE", "publisher": {"@id": BIZ_ID}},
    ]
    biz = dict(BUSINESS)
    if path in ("/", "/preise"):
        biz["hasOfferCatalog"] = {
            "@type": "OfferCatalog",
            "name": "Prüfungen & Gutachten",
            "itemListElement": [
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": n},
                 "priceSpecification": {"@type": "PriceSpecification", "minPrice": p, "priceCurrency": "EUR"}}
                for n, p in PRICES
            ],
        }
    graph.append(biz)
    page = {
        "@type": "ContactPage" if path == "/kontakt" else ("AboutPage" if path == "/ueber-uns" else "WebPage"),
        "@id": f"{url_of(path)}#webpage",
        "url": url_of(path),
        "name": meta["title"],
        "description": meta["description"],
        "inLanguage": "de-DE",
        "isPartOf": {"@id": f"{SITE}/#website"},
        "about": {"@id": BIZ_ID},
        "primaryImageOfPage": {"@type": "ImageObject", "url": f"{SITE}/og-image.jpg"},
    }
    if path != "/":
        crumbs = {"@type": "BreadcrumbList", "@id": f"{url_of(path)}#breadcrumb", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Startseite", "item": f"{SITE}/"},
            {"@type": "ListItem", "position": 2, "name": meta["name"], "item": url_of(path)},
        ]}
        page["breadcrumb"] = {"@id": crumbs["@id"]}
        graph.append(page)
        graph.append(crumbs)
    else:
        graph.append(page)
    data = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, indent=1)
    return data.replace("</", "<\\/")


def head(path, meta, index=True):
    e = html.escape
    canon = url_of(path)
    tags = [
        f"<title>{e(meta['title'])}</title>",
        f'<meta name="description" content="{e(meta["description"])}" />',
        f'<meta name="robots" content="{"index, follow, max-image-preview:large" if index else "noindex, follow"}" />',
    ]
    if path is not None:
        tags += [
            f'<link rel="canonical" href="{canon}" />',
            '<meta property="og:type" content="website" />',
            '<meta property="og:locale" content="de_DE" />',
            f'<meta property="og:site_name" content="{e(NAME)}" />',
            f'<meta property="og:title" content="{e(meta["title"])}" />',
            f'<meta property="og:description" content="{e(meta["description"])}" />',
            f'<meta property="og:url" content="{canon}" />',
            f'<meta property="og:image" content="{SITE}/og-image.jpg" />',
            '<meta property="og:image:width" content="1200" />',
            '<meta property="og:image:height" content="630" />',
            f'<meta property="og:image:alt" content="{e(NAME)} – FSP Prüfstützpunkt" />',
            '<meta name="twitter:card" content="summary_large_image" />',
            f'<meta name="twitter:title" content="{e(meta["title"])}" />',
            f'<meta name="twitter:description" content="{e(meta["description"])}" />',
            f'<meta name="twitter:image" content="{SITE}/og-image.jpg" />',
            f'<script type="application/ld+json">{jsonld(path, meta)}</script>',
        ]
    return "\n    ".join(tags)


def free_port():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p


def main():
    template = (OUT / "index.html").read_text()
    port = free_port()
    srv = subprocess.Popen(["npx", "vite", "preview", "--port", str(port), "--strictPort"], cwd=ROOT,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    texts = {}
    try:
        for _ in range(60):
            try:
                socket.create_connection(("127.0.0.1", port), 1).close(); break
            except OSError:
                time.sleep(0.5)
        routes = list(CFG["pages"].items()) + [("__404__", CFG["notFound"])]
        with sync_playwright() as pw:
            b = pw.chromium.launch()
            pg = b.new_page(viewport={"width": 1280, "height": 900})
            for path, meta in routes:
                target = "/diese-seite-gibt-es-nicht" if path == "__404__" else path
                pg.goto(f"http://127.0.0.1:{port}{target}", wait_until="networkidle")
                pg.wait_for_timeout(400)
                body = pg.evaluate("document.getElementById('root').innerHTML")
                if path != "__404__":
                    texts[path] = pg.evaluate("document.querySelector('main').innerText")
                is404 = path == "__404__"
                h = head(None if is404 else path, meta, index=(not is404 and meta.get("index", True)))
                page = re.sub(r"<!--SEO-HEAD-->.*?<!--/SEO-HEAD-->", lambda m: h, template, flags=re.S)
                page = page.replace('<div id="root"></div>', f'<div id="root">{body}</div>')
                dest = OUT / ("404.html" if is404 else ("index.html" if path == "/" else f"{path.strip('/')}/index.html"))
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_text(page)
                print("✓", path, "->", dest.relative_to(OUT))
            b.close()
    finally:
        srv.terminate()

    indexed = [(p, m) for p, m in CFG["pages"].items() if m.get("index", True)]

    # sitemap.xml
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p, m in indexed:
        sm.append(f"  <url><loc>{url_of(p)}</loc><lastmod>{TODAY}</lastmod><priority>{m.get('priority', '0.5')}</priority></url>")
    sm.append("</urlset>")
    (OUT / "sitemap.xml").write_text("\n".join(sm) + "\n")

    # robots.txt
    bots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai",
            "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot",
            "CCBot", "Meta-ExternalAgent", "DuckAssistBot", "MistralAI-User", "cohere-ai"]
    robots = ["# Alle Suchmaschinen und KI-Suchbots sind ausdrücklich erlaubt", "User-agent: *", "Allow: /", ""]
    for bot in bots:
        robots += [f"User-agent: {bot}", "Allow: /", ""]
    robots.append(f"Sitemap: {SITE}/sitemap.xml")
    (OUT / "robots.txt").write_text("\n".join(robots) + "\n")

    # llms.txt (nur indexierbare Seiten)
    llms = [f"# {NAME}", "",
            "> TÜV-Rheinland-zertifizierter FSP-Prüfstützpunkt in Staig (Gassenäcker N 8, 89195 Staig). Hauptuntersuchung (HU), Sicherheitsprüfung, Änderungsabnahmen, Oldtimergutachten, Gasprüfungen sowie Schaden- und Wertgutachten. Telefon 07305 9357646, mobil 0179 5677777. Termine werden online gebucht.",
            "", "## Seiten", ""]
    for p, m in indexed:
        llms.append(f"- [{m['name']}]({url_of(p)}): {m['description']}")
    llms += ["", "## Optional", "", f"- [Volltext aller Seiten]({SITE}/llms-full.txt)"]
    (OUT / "llms.txt").write_text("\n".join(llms) + "\n")

    # llms-full.txt
    full = [f"# {NAME} – Volltext", "", llms[2], ""]
    for p, m in indexed:
        t = re.sub(r"\n{3,}", "\n\n", texts[p]).strip()
        full += [f"## {m['name']}", f"URL: {url_of(p)}", "", t, ""]
    (OUT / "llms-full.txt").write_text("\n".join(full) + "\n")
    print("✓ sitemap.xml, robots.txt, llms.txt, llms-full.txt")


if __name__ == "__main__":
    main()
