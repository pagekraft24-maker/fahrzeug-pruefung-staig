import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import seo from "@/seo/pages.json";

type PageMeta = { title: string; description: string };

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Titel & Description bei Navigation innerhalb der Seite aktualisieren
  useEffect(() => {
    const pages = seo.pages as Record<string, PageMeta>;
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const meta = pages[path] ?? seo.notFound;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [location.pathname]);

  return (
    <div className={isHome ? "" : "pt-28 md:pt-32"}>
      {children}
    </div>
  );
}
