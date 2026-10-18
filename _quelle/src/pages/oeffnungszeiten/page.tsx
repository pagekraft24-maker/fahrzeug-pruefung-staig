import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { openingHours, openingHoursNotice, phone } from "@/mocks/de/navigation";

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

const dayMap: Record<string, number> = {
  "Mo – Di": 1,
  "Mittwoch": 3,
  "Donnerstag": 4,
  "Freitag": 5,
  "Samstag": 6,
  "Sonntag": 0,
};

const dayLabels: Record<number, string> = {
  0: "Sonntag",
  1: "Montag/Dienstag",
  3: "Mittwoch",
  4: "Donnerstag",
  5: "Freitag",
  6: "Samstag",
};

function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

interface OpenStatus {
  isOpen: boolean;
  isTodayClosed: boolean;
  mainText: string;
  subText: string;
  hoursToShow: string[];
  accentColor: string;
}

function getOpenStatus(hours: string[] | undefined): OpenStatus {
  if (!hours || hours[0] === "Geschlossen") {
    return {
      isOpen: false,
      isTodayClosed: true,
      mainText: "Heute geschlossen",
      subText: "Termine können Sie online buchen",
      hoursToShow: [],
      accentColor: "gray",
    };
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const range of hours) {
    const parts = range.split('–').map((s) => s.trim());
    if (parts.length < 2) continue;
    const startMinutes = parseTime(parts[0]);
    const endMinutes = parseTime(parts[1]);

    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      const remaining = endMinutes - currentMinutes;
      const remainingHours = Math.floor(remaining / 60);
      const remainingMinutes = remaining % 60;
      let remainingText = "";
      if (remainingHours > 0) remainingText += `${remainingHours} Std `;
      if (remainingMinutes > 0) remainingText += `${remainingMinutes} Min`;

      return {
        isOpen: true,
        isTodayClosed: false,
        mainText: "Jetzt geöffnet",
        subText: remainingText ? `Noch ${remainingText} offen` : `Schließt um ${parts[1]} Uhr`,
        hoursToShow: hours,
        accentColor: "green",
      };
    }
  }

  const firstParts = hours[0].split('–').map((s) => s.trim());
  const firstStart = parseTime(firstParts[0]);

  if (currentMinutes < firstStart) {
    return {
      isOpen: false,
      isTodayClosed: false,
      mainText: "Jetzt geschlossen",
      subText: `Öffnet heute um ${firstParts[0]} Uhr`,
      hoursToShow: hours,
      accentColor: "yellow",
    };
  }

  const lastParts = hours[hours.length - 1].split('–').map((s) => s.trim());
  return {
    isOpen: false,
    isTodayClosed: false,
    mainText: "Jetzt geschlossen",
    subText: `Geschlossen seit ${lastParts[1]} Uhr`,
    hoursToShow: hours,
    accentColor: "gray",
  };
}

function findNextOpenDay(today: number): { dayName: string; hours: string[] } | null {
  const order = [1, 3, 4, 5, 6, 0];
  const todayIdx = order.indexOf(today);

  for (let i = 1; i <= 7; i++) {
    const checkIdx = (todayIdx + i) % order.length;
    const checkDay = order[checkIdx];
    const entry = openingHours.find((h) => dayMap[h.day] === checkDay);
    if (entry && entry.hours[0] !== "Geschlossen") {
      return { dayName: entry.day, hours: entry.hours };
    }
  }
  return null;
}

export default function Oeffnungszeiten() {
  const today = new Date().getDay();
  const todayHours = openingHours.find((h) => dayMap[h.day] === today);
  const status = getOpenStatus(todayHours?.hours);
  const nextOpen = status.isTodayClosed || !status.isOpen ? findNextOpenDay(today) : null;

  return (
    <div className="w-full">
      {/* Hero with background image */}
      <div className="relative h-[420px] md:h-[520px] overflow-hidden">
        <img
          src="/images/hero-bg.webp"
          alt="Werkstatt Atmosphäre"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold rounded-full mb-6 border border-white/20">
            <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
            Planen Sie Ihren Besuch
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight tracking-tight">
            Öffnungszeiten in Staig
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-lg mx-auto leading-relaxed">
            Termine werden bevorzugt online gebucht. Wir freuen uns auf Ihren Besuch!
          </p>
        </div>
      </div>

      {/* Live Status Card */}
      <RevealSection className="w-full px-4 md:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-background-200/80 p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Status Icon */}
              <div className="relative flex-shrink-0">
                <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-500 ${
                  status.isOpen
                    ? "bg-primary-100"
                    : status.accentColor === "yellow"
                      ? "bg-accent-100"
                      : "bg-background-200"
                }`}>
                  <i className={`${
                    status.isOpen
                      ? "ri-check-line"
                      : "ri-close-line"
                  } w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-3xl md:text-4xl ${
                    status.isOpen
                      ? "text-primary-600"
                      : status.accentColor === "yellow"
                        ? "text-accent-600"
                        : "text-foreground-400"
                  }`}></i>
                </div>
                {status.isOpen && (
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-primary-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* Status Details */}
              <div className="text-center md:text-left flex-1">
                {status.isOpen ? (
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                      <span className="text-sm font-medium text-primary-700">
                        {status.subText}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-2">
                      Aktuelle Öffnungszeiten
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      {status.hoursToShow.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-xl text-base font-bold text-primary-800"
                        >
                          <i className="ri-time-line w-4 h-4 flex items-center justify-center text-primary-500"></i>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full ${
                        status.accentColor === "yellow" ? "bg-accent-500" : "bg-background-300"
                      }`}></div>
                      <span className={`text-sm font-medium ${
                        status.accentColor === "yellow" ? "text-accent-700" : "text-foreground-500"
                      }`}>
                        {status.subText}
                      </span>
                    </div>

                    {status.hoursToShow.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-2">
                          Heutige Öffnungszeiten
                        </p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                          {status.hoursToShow.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-background-100 border border-background-200 rounded-xl text-base font-bold text-foreground-700"
                            >
                              <i className="ri-time-line w-4 h-4 flex items-center justify-center text-foreground-400"></i>
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {nextOpen && (
                      <div className="flex items-center justify-center md:justify-start gap-2 p-3 bg-accent-50 border border-accent-200 rounded-xl">
                        <i className="ri-calendar-event-line w-5 h-5 flex items-center justify-center text-accent-500"></i>
                        <div className="text-left">
                          <p className="text-xs font-semibold text-accent-700">
                            Nächste Öffnung
                          </p>
                          <p className="text-sm font-bold text-foreground-900">
                            {nextOpen.dayName}: {nextOpen.hours.join(" · ")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                to="/termin-vereinbaren"
                className={`flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 ${
                  status.isOpen
                    ? "bg-primary-500 text-foreground-950 hover:bg-primary-400"
                    : "bg-foreground-950 text-white hover:bg-foreground-800"
                }`}
              >
                <i className="ri-calendar-check-line w-4 h-4 flex items-center justify-center"></i>
                Termin buchen
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>


      <RevealSection className="w-full px-4 md:px-6 lg:px-8 pt-10 md:pt-12">
        <div className="max-w-2xl mx-auto">
          <div className={`flex items-center justify-center gap-4 py-4 px-6 rounded-xl border-2 ${
            status.isOpen
              ? "bg-primary-50 border-primary-300"
              : status.accentColor === "yellow"
                ? "bg-accent-50 border-accent-300"
                : "bg-background-100 border-background-300"
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              status.isOpen
                ? "bg-primary-500"
                : status.accentColor === "yellow"
                  ? "bg-accent-500"
                  : "bg-background-300"
            }`}>
              <i className={`${
                status.isOpen ? "ri-check-line" : "ri-close-line"
              } w-5 h-5 flex items-center justify-center text-white text-lg`}></i>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground-950">
                {status.mainText}
              </h2>
              <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                status.isOpen
                  ? "bg-primary-100 text-primary-700"
                  : status.accentColor === "yellow"
                    ? "bg-accent-100 text-accent-700"
                    : "bg-background-200 text-foreground-500"
              }`}>
                {dayLabels[today]}
              </span>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Timeline Section */}
      <RevealSection className="w-full px-4 md:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground-950 mb-3">
              Wochenübersicht
            </h2>
            <p className="text-sm md:text-base text-foreground-500">
              Alle Öffnungszeiten auf einen Blick
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[18px] md:left-[22px] top-2 bottom-2 w-0.5 bg-background-200 rounded-full"></div>

            {openingHours.map((item, idx) => {
              const isClosed = item.hours[0] === "Geschlossen";
              const isToday = dayMap[item.day] === today;

              return (
                <div
                  key={idx}
                  className={`relative flex gap-5 md:gap-6 mb-6 md:mb-8 last:mb-0 transition-all duration-300 ${
                    isToday ? "scale-[1.02]" : ""
                  }`}
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-9 h-9 md:w-11 md:h-11 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-all duration-300 ${
                        isToday
                          ? isClosed
                            ? "bg-background-300"
                            : "bg-primary-500"
                          : isClosed
                            ? "bg-background-300"
                            : "bg-accent-400"
                      }`}
                    >
                      <i className={`${
                        isClosed
                          ? "ri-close-line"
                          : isToday
                            ? "ri-sun-line"
                            : "ri-time-line"
                      } w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-white text-xs md:text-sm`}></i>
                    </div>
                    {isToday && !isClosed && (
                      <div className="absolute inset-0 rounded-full border-4 border-white shadow-md">
                        <div className="absolute inset-[-4px] rounded-full bg-primary-500 animate-ping opacity-20"></div>
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex-1 rounded-xl border transition-all duration-300 ${
                      isToday
                        ? isClosed
                          ? "bg-background-100 border-background-300 shadow-md"
                          : "bg-primary-50 border-primary-300 shadow-lg shadow-primary-500/10"
                        : isClosed
                          ? "bg-background-100/50 border-background-200/70 opacity-60"
                          : "bg-white border-background-200/70 hover:border-accent-200 hover:shadow-md"
                    }`}
                  >
                    <div className="p-4 md:p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-base font-bold ${
                            isToday ? "text-foreground-950" : isClosed ? "text-foreground-400" : "text-foreground-900"
                          }`}>
                            {item.day}
                          </span>
                          {isToday && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full ${
                              isClosed
                                ? "bg-background-300 text-foreground-500"
                                : "bg-primary-500 text-foreground-950"
                            }`}>
                              Heute
                            </span>
                          )}
                        </div>
                        <span className={`text-xs font-semibold ${
                          isToday
                            ? isClosed ? "text-foreground-400" : "text-primary-600"
                            : isClosed ? "text-foreground-400" : "text-accent-500"
                        }`}>
                          {isClosed ? "Geschlossen" : "Geöffnet"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {item.hours.map((h, hIdx) => (
                          <span
                            key={hIdx}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                              h === "Geschlossen"
                                ? "bg-background-200/50 text-foreground-400"
                                : isToday
                                  ? "bg-primary-100 text-primary-800 border border-primary-200"
                                  : "bg-accent-50 text-foreground-800"
                            }`}
                          >
                            {h !== "Geschlossen" && (
                              <i className="ri-time-line w-3.5 h-3.5 flex items-center justify-center text-accent-500"></i>
                            )}
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RevealSection>

      {/* Bottom Cards */}
      <RevealSection className="w-full bg-background-100 py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary-500/5 rounded-lg -translate-y-1/2 -translate-x-1/2"></div>

        <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl border border-background-200/70 p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
                <i className="ri-zzz-line w-7 h-7 flex items-center justify-center text-primary-700"></i>
              </div>
              <h3 className="text-xl font-bold text-foreground-950 mb-3">Feiertage</h3>
              <p className="text-sm text-foreground-600 leading-relaxed mb-4">
                An gesetzlichen Feiertagen in Baden-Württemberg bleibt unser Prüfstützpunkt geschlossen. Bitte planen Sie Ihren Besuch entsprechend.
              </p>
              <p className="text-sm text-foreground-500">
                Für Terminvereinbarungen nutzen Sie unser Online-Formular.
              </p>
            </div>

            <div className="bg-foreground-950 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/15 rounded-lg -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary-500 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20">
                  <i className="ri-calendar-check-line w-7 h-7 flex items-center justify-center text-foreground-950"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Keine Wartezeit?</h3>
                <p className="text-sm text-foreground-300 leading-relaxed mb-6">
                  Buchen Sie Ihren Termin bequem online. Wir bestätigen Ihnen den Termin umgehend und bereiten alles vor.
                </p>
                <div className="space-y-3">
                  <Link
                    to="/termin-vereinbaren"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-primary-500 text-foreground-950 font-semibold text-sm rounded-xl hover:bg-primary-400 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
                    Jetzt Termin buchen
                  </Link>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-white/10 text-white font-medium text-sm rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                    {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}