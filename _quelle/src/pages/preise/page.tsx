import { useState } from "react";

export default function Preise() {
  const [activeTab, setActiveTab] = useState<"hu" | "oldtimer" | "sonstige">("hu");

  const preise = {
    hu: [
      { service: "Hauptuntersuchung (HU) Pkw", preis: "ab 95,00 €" },
      { service: "Hauptuntersuchung (HU) Lkw bis 3,5t", preis: "ab 120,00 €" },
      { service: "Sicherheitsprüfung (AU) Pkw", preis: "ab 35,00 €" },
      { service: "Sicherheitsprüfung (AU) Lkw", preis: "ab 55,00 €" },
      { service: "Änderungsabnahme §19(3) StVZO", preis: "ab 85,00 €" },
      { service: "BOKraft-Prüfung", preis: "ab 75,00 €" },
      { service: "Feinstaubplakette", preis: "ab 15,00 €" },
      { service: "Tempo 100 Zulassung Anhänger", preis: "ab 65,00 €" },
    ],
    oldtimer: [
      { service: "Oldtimergutachten §23 StVZO", preis: "ab 180,00 €" },
      { service: "Oldtimerwertgutachten", preis: "ab 250,00 €" },
      { service: "Begutachtung Fahrzeugidentität", preis: "ab 150,00 €" },
    ],
    sonstige: [
      { service: "Gasprüfung GAP/GWP", preis: "ab 95,00 €" },
      { service: "Gasprüfung Wohnmobile G607", preis: "ab 120,00 €" },
      { service: "Schaden- und Wertgutachten", preis: "ab 200,00 €" },
      { service: "UVV / Betriebssicherheitsprüfung", preis: "ab 150,00 €" },
    ],
  };

  const tabs = [
    { key: "hu" as const, label: "HU & AU", icon: "ri-car-line" },
    { key: "oldtimer" as const, label: "Oldtimer", icon: "ri-time-line" },
    { key: "sonstige" as const, label: "Sonstige", icon: "ri-hammer-line" },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="w-full bg-background-100 py-12 md:py-16">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-lg mb-4">
              <i className="ri-price-tag-3-line w-4 h-4 flex items-center justify-center"></i>
              Transparente Preise
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground-950 mb-3">
              Preise für HU &amp; Gutachten
            </h1>
            <p className="text-sm text-foreground-600">
              Alle Preise verstehen sich inklusive gesetzlicher MwSt. und sind als Richtpreise zu verstehen.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-1 sm:gap-2 mb-8 bg-background-100 p-1.5 rounded-md w-full sm:w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-white text-foreground-950 shadow-sm"
                    : "text-foreground-600 hover:text-foreground-900"
                }`}
              >
                <i className={`${tab.icon} w-4 h-4 flex items-center justify-center`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Price Table */}
          <div className="bg-white border border-background-200 rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-background-100">
                <tr>
                  <th className="text-left px-5 py-4 font-semibold text-foreground-900">Leistung</th>
                  <th className="text-right px-5 py-4 font-semibold text-foreground-900">Preis</th>
                </tr>
              </thead>
              <tbody>
                {preise[activeTab].map((item, idx) => (
                  <tr key={idx} className="border-t border-background-200">
                    <td className="px-5 py-4 text-foreground-800">
                      <div className="flex items-center gap-2">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-primary-500"></i>
                        {item.service}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-foreground-900 whitespace-nowrap">{item.preis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-foreground-500 mt-4">
            * Preise ohne Gewähr. Bitte erfragen Sie aktuelle Preise telefonisch oder vor Ort.
          </p>
        </div>
      </div>
    </div>
  );
}