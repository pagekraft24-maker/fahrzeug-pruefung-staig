import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { navLinks, phone, logoUrl } from "@/mocks/de/navigation";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary-500 shadow-md border-b border-primary-600/40"
          : "bg-primary-500"
      }`}
    >
      <div className="w-full px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <img
              src={logoUrl}
              alt="FSP Fahrzeug-Sicherheitsprüfung"
              className="h-9 md:h-10 w-auto object-contain"
              width="384"
              height="149"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.href === "/termin-vereinbaren") return null;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors rounded-lg ${
                      active
                        ? "text-foreground-950"
                        : "text-foreground-900 hover:text-foreground-950 hover:bg-primary-600"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-foreground-950 rounded-lg" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Phone - desktop only */}
            <a
              href={`tel:${phone}`}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground-900 hover:text-foreground-950 transition-colors px-2 py-1.5 rounded-lg hover:bg-primary-600"
            >
              <i className="ri-phone-line w-4 h-4 flex items-center justify-center text-foreground-950" />
              <span className="hidden lg:inline">{phone}</span>
            </a>

            {/* Termin button - desktop */}
            <Link
              to="/termin-vereinbaren"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-foreground-950 text-sm font-semibold rounded-lg hover:bg-background-50 transition-all hover:shadow-md hover:shadow-foreground-950/10 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <i className="ri-calendar-check-line w-4 h-4 flex items-center justify-center" />
              <span className="hidden lg:inline">Termin</span>
              <span className="lg:hidden">Termin</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-foreground-950 hover:bg-primary-600 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü öffnen"
            >
              <i className={`ri-${mobileOpen ? "close" : "menu"}-line w-5 h-5 flex items-center justify-center text-xl`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary-500 border-t border-primary-600/40 shadow-lg">
          <div className="px-4 py-3 space-y-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? "text-foreground-950 bg-primary-600/50"
                      : "text-foreground-900 hover:text-foreground-950 hover:bg-primary-600"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-lg ${active ? "bg-foreground-950" : "bg-primary-700"}`} />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-primary-600/40">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-foreground-900 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center text-foreground-950" />
                {phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}