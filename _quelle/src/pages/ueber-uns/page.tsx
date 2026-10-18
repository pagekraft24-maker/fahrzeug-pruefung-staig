import { logoUrl } from "@/mocks/de/navigation";

export default function UeberUns() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="w-full bg-background-100 py-12 md:py-16">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-lg mb-4">
              <i className="ri-user-smile-line w-4 h-4 flex items-center justify-center"></i>
              Wer wir sind
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground-950 mb-3">
              Über uns – Prüfstützpunkt Staig
            </h1>
            <p className="text-sm text-foreground-600">
              Ihr verlässlicher Partner für Fahrzeugprüfungen in Staig und Umgebung
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8 bg-white rounded-md border border-background-200/70 p-6">
            <img src={logoUrl} alt="FSP Logo" className="h-14 w-auto" />
            <div>
              <p className="text-sm font-semibold text-foreground-950">FSP Fahrzeug-Sicherheitsprüfung</p>
              <p className="text-xs text-foreground-500">TÜV Rheinland zertifiziert</p>
            </div>
          </div>

          <div className="space-y-5 text-sm md:text-base text-foreground-700 leading-relaxed">
            <p className="font-semibold text-foreground-950 text-lg">
              Ihr verlässlicher Partner für Fahrzeugprüfungen in Staig und Umgebung
            </p>
            <p>
              Wir sind ein zertifizierter Prüfstützpunkt im Auftrag der FSP Fahrzeug-Sicherheitsprüfung GmbH & Co. KG und der FSP Schaden- und Wertgutachterdienst GmbH. Als Sachverständige und Prüfingenieure stehen wir für Professionalität, Fairness und Zuverlässigkeit.
            </p>
            <p>
              Unser Team verfügt über langjährige Erfahrung im Bereich der Fahrzeugprüfung und -bewertung. Wir begleiten Sie bei allen wichtigen Fragen rund um das Thema Mobilität – von der Hauptuntersuchung bis zum Oldtimergutachten.
            </p>
            <p>
              Unser Ziel ist es, dass Sie mit uns sicher auf die Straße fahren. Wir nehmen uns Zeit für Sie und Ihr Fahrzeug und sorgen für eine schnelle, unkomplizierte Abwicklung aller Prüfleistungen.
            </p>
            <p>
              Wir freuen uns darauf, Sie in unserem Prüfstützpunkt in Staig begrüßen zu dürfen!
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-md border border-background-200/70 p-5 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mx-auto mb-3">
                <i className="ri-shield-check-line w-6 h-6 flex items-center justify-center text-primary-700"></i>
              </div>
              <p className="text-sm font-semibold text-foreground-950 mb-1">TÜV Rheinland</p>
              <p className="text-xs text-foreground-500">Zertifizierter Prüfstützpunkt</p>
            </div>
            <div className="bg-white rounded-md border border-background-200/70 p-5 text-center">
              <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center mx-auto mb-3">
                <i className="ri-award-line w-6 h-6 flex items-center justify-center text-accent-700"></i>
              </div>
              <p className="text-sm font-semibold text-foreground-950 mb-1">FSP</p>
              <p className="text-xs text-foreground-500">Fahrzeug-Sicherheitsprüfung GmbH</p>
            </div>
            <div className="bg-white rounded-md border border-background-200/70 p-5 text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center mx-auto mb-3">
                <i className="ri-file-list-3-line w-6 h-6 flex items-center justify-center text-secondary-700"></i>
              </div>
              <p className="text-sm font-semibold text-foreground-950 mb-1">FSP Gutachter</p>
              <p className="text-xs text-foreground-500">Schaden- und Wertgutachterdienst</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}