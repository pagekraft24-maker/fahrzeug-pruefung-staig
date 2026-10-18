import { Link } from "react-router-dom";
import { navLinks, address, phone, logoUrl } from "@/mocks/de/navigation";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Main footer content */}
      <div className="w-full bg-foreground-900 py-14 md:py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/5 rounded-lg -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/5 rounded-lg translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {/* Brand column */}
          <div>
            <img src={logoUrl} alt="FSP Logo" width="384" height="149" className="h-12 w-auto mb-5 bg-white rounded-md px-2 py-1" />
            <p className="text-sm text-foreground-400 leading-relaxed mb-5">
              Ihr verlässlicher Partner für Fahrzeugprüfungen in Staig und Umgebung.
              Im Auftrag der FSP und TÜV Rheinland.
            </p>
            <div className="space-y-2 text-sm text-foreground-400">
              <p className="flex items-center gap-2">
                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center text-primary-500"></i>
                {address}
              </p>
              <p className="flex items-center gap-2">
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center text-primary-500"></i>
                <a href={`tel:${phone}`} className="hover:text-primary-500 transition-colors">{phone}</a>
              </p>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Navigation</h3>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-foreground-400 hover:text-primary-500 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Partner</h3>
            <p className="text-sm text-foreground-400">
              <strong className="text-white">FSP</strong> Fahrzeug-Sicherheitsprüfung GmbH & Co. KG
            </p>
            <p className="text-sm text-foreground-400 mt-1">
              <strong className="text-white">TÜV Rheinland</strong> zertifiziert
            </p>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="w-full bg-foreground-950 py-5 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground-500">
          <p>© Urheberrecht. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="hover:text-foreground-300 transition-colors">Impressum</Link>
            <Link to="/" className="hover:text-foreground-300 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}