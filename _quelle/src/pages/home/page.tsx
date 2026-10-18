import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  logoUrl,
  stationImageUrl,
  welcomeText,
  openingHours,
  openingHoursNotice,
  officialServices,
  otherServices,
  fspUrl,
  fischerGutachtenUrl,
  address,
  phone,
} from "@/mocks/de/navigation";
import { servicesCards, stats } from "@/mocks/de/services";
import ContactForm from "@/components/feature/ContactForm";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-700 ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] md:min-h-[720px] lg:min-h-[800px] flex items-center overflow-hidden bg-background-50 lg:bg-gradient-to-r lg:from-background-50 lg:via-background-100 lg:to-foreground-900">
        {/* Soft gradient overlay for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-background-50/80 via-background-100/40 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 pt-32 pb-20 md:pt-36 md:pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 mb-6">
                <img
                  src={logoUrl}
                  alt="FSP TÜV Rheinland"
                  className="h-8 md:h-10 w-auto object-contain"
                  width="384"
                  height="149"
                />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider rounded-lg border border-primary-200">
                  <i className="ri-shield-check-line w-3.5 h-3.5 flex items-center justify-center"></i>
                  Zertifiziert
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground-950 leading-tight mb-6">
                <span className="block text-sm md:text-base font-semibold uppercase tracking-wider text-foreground-600 mb-3">Fahrzeugprüfung &amp; HU in Staig</span>
                Wir bringen Sicherheit
                <br />
                <span className="text-primary-500">auf die Straße</span>
              </h1>
              <p className="text-base md:text-lg text-foreground-600 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Ihr Partner für professionelle Fahrzeugprüfungen in Staig/Steinberg.
                Hauptuntersuchung, Oldtimergutachten und mehr – fair und zuverlässig.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                <Link
                  to="/termin-vereinbaren"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-foreground-950 font-semibold text-sm rounded-lg hover:bg-primary-400 hover:scale-105 transition-all duration-300 whitespace-nowrap shadow-lg shadow-primary-500/30"
                >
                  <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
                  Termin vereinbaren
                </Link>
                <Link
                  to="/preise"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground-900 font-semibold text-sm rounded-lg border border-background-200 hover:bg-background-100 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  <i className="ri-price-tag-3-line w-4 h-4 flex items-center justify-center"></i>
                  Preise ansehen
                </Link>
              </div>
            </div>

            {/* Right: Car Image */}
            <div className="relative hidden lg:flex items-center justify-center">
              <img
                src="/images/hero-car.webp"
                width="1400"
                height="944"
                alt="Fahrzeug bei der Prüfung"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
              {/* Decorative glow behind car */}
              <div className="absolute inset-0 bg-gradient-to-l from-primary-500/20 to-transparent rounded-lg -z-10"></div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-50 to-transparent"></div>
      </section>

      {/* Stats Bar */}
      <RevealSection className="w-full px-4 md:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card bg-white/60 backdrop-blur-sm rounded-lg border border-white/80 p-5 md:p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-accent-500 mb-1">{stat.value}</div>
              <div className="text-xs text-foreground-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* Welcome Section */}
      <RevealSection className="w-full px-4 md:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-lg mb-4">
              <i className="ri-user-smile-line w-4 h-4 flex items-center justify-center"></i>
              Willkommen
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground-950 mb-6 leading-tight">
              Fair und zuverlässig –
              <br />
              <span className="text-accent-500">seit über 15 Jahren</span>
            </h2>
            <div className="space-y-4 text-sm md:text-base text-foreground-700 leading-relaxed">
              {welcomeText.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? "font-semibold text-foreground-900 text-lg" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/ueber-uns"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-500 text-white font-semibold text-sm rounded-lg hover:bg-accent-600 transition-colors hover:scale-105 duration-300"
              >
                Mehr über uns
                <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
              </Link>
            </div>
          </div>
          <div className="relative max-w-sm mx-auto">
            <div className="rounded-lg overflow-hidden border border-background-200/70 shadow-2xl shadow-foreground-950/10">
              <img
                src={stationImageUrl}
                alt="Kfz-Prüfstützpunkt FSP"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-md border border-background-200/70 p-5 shadow-xl shadow-foreground-950/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <i className="ri-phone-line w-6 h-6 flex items-center justify-center text-foreground-950"></i>
                </div>
                <div>
                  <p className="text-xs text-foreground-500 font-medium">Jetzt anrufen</p>
                  <a href={`tel:${phone}`} className="text-base font-semibold text-foreground-950 hover:text-accent-500">{phone}</a>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500/20 rounded-lg -z-10"></div>
            <div className="absolute -bottom-4 -right-8 w-32 h-32 bg-accent-500/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </RevealSection>

      {/* Opening Hours Section */}
      <RevealSection className="w-full bg-background-100 py-20 md:py-28 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-lg -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/5 rounded-lg translate-y-1/2 -translate-x-1/2"></div>

        <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-100 text-accent-700 text-xs font-semibold rounded-lg mb-4">
                <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
                Planen Sie Ihren Besuch
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground-950 mb-3">
                Öffnungszeiten
              </h2>
              <p className="text-sm text-foreground-600 max-w-xl mx-auto">
                {openingHoursNotice[0]}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {openingHours.map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-5 text-center border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    item.hours[0] === "Geschlossen"
                      ? "bg-background-200/40 border-background-200/50"
                      : "bg-white border-background-200/70 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">
                    {item.day}
                  </div>
                  <div className="space-y-1">
                    {item.hours.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        className={`text-sm font-semibold ${
                          h === "Geschlossen" ? "text-foreground-400" : "text-foreground-950"
                        }`}
                      >
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/termin-vereinbaren"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-foreground-950 font-semibold text-sm rounded-lg hover:bg-primary-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-500/20"
              >
                <i className="ri-calendar-check-line w-4 h-4 flex items-center justify-center"></i>
                Termin online buchen
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Services Section */}
      <RevealSection className="w-full px-4 md:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-lg mb-4">
              <i className="ri-hammer-line w-4 h-4 flex items-center justify-center"></i>
              Unser Angebot
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground-950 mb-3">
              Unsere Leistungen
            </h2>
            <p className="text-sm text-foreground-600 max-w-xl mx-auto">
              Entdecken Sie unsere umfassenden Fahrzeugprüfdienstleistungen.
            </p>
          </div>

          {/* Official Services */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground-900 mb-1">
              Amtliche Dienstleistungen
            </h3>
            <p className="text-xs text-foreground-500 mb-8">
              Im Auftrag der <strong className="text-foreground-700">FSP</strong> Fahrzeug-Sicherheitsprüfung GmbH & Co. KG
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {servicesCards.official.map((service, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-lg border border-background-200/70 p-6 hover:border-primary-300 hover:bg-primary-50/30 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-md bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300 shadow-sm group-hover:shadow-md">
                  <i className={`${service.icon} w-6 h-6 flex items-center justify-center text-primary-700 group-hover:text-foreground-950 transition-colors duration-300`}></i>
                </div>
                <h4 className="text-base font-semibold text-foreground-950 mb-2">{service.title}</h4>
                <p className="text-sm text-foreground-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Other Services */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground-900 mb-1">
              Sonstige Dienstleistungen
            </h3>
            <p className="text-xs text-foreground-500 mb-8">
              Im Auftrag der <strong className="text-foreground-700">FSP</strong> Schaden- und Wertgutachterdienst GmbH
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {servicesCards.other.map((service, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-lg border border-background-200/70 p-6 hover:border-accent-300 hover:bg-accent-50/30 hover:shadow-lg hover:shadow-accent-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-md bg-accent-100 flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors duration-300 shadow-sm group-hover:shadow-md">
                  <i className={`${service.icon} w-6 h-6 flex items-center justify-center text-accent-700 group-hover:text-white transition-colors duration-300`}></i>
                </div>
                <h4 className="text-base font-semibold text-foreground-950 mb-2">{service.title}</h4>
                <p className="text-sm text-foreground-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={fischerGutachtenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-accent-500 hover:text-accent-600 transition-colors hover:scale-105 duration-300 border border-accent-500/30 rounded-lg hover:bg-accent-50"
            >
              <i className="ri-external-link-line w-4 h-4 flex items-center justify-center"></i>
              www.fischergutachten.de
            </a>
          </div>
        </div>
      </RevealSection>

      {/* CTA Section */}
      <section className="w-full bg-primary-500 py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-lg"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-lg"></div>
        </div>
        <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground-950 mb-4">
              Bereit für Ihre Fahrzeugprüfung?
            </h2>
            <p className="text-sm md:text-base text-foreground-800 mb-10 max-w-lg mx-auto">
              Buchen Sie jetzt Ihren Termin online oder rufen Sie uns an. Wir freuen uns auf Sie!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/termin-vereinbaren"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground-950 text-white font-semibold text-sm rounded-lg hover:bg-foreground-800 hover:scale-105 transition-all duration-300 shadow-lg shadow-foreground-950/20"
              >
                <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
                Termin buchen
              </Link>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/30 text-foreground-950 font-semibold text-sm rounded-lg hover:bg-white/40 hover:scale-105 transition-all duration-300"
              >
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                {phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}