import { address, phone, phoneMobile, logoUrl } from "@/mocks/de/navigation";

export default function Kontakt() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="w-full bg-background-100 py-12 md:py-16">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-lg mb-4">
              <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center"></i>
              Wir sind für Sie da
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground-950 mb-3">
              Kontakt &amp; Anfahrt
            </h1>
            <p className="text-sm text-foreground-600">
              Haben Sie Fragen? Kontaktieren Sie uns – wir helfen Ihnen gerne.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-md border border-background-200/70 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-primary-700"></i>
              </div>
              <h3 className="text-base font-semibold text-foreground-950 mb-3">Adresse</h3>
              <div className="space-y-1 text-sm text-foreground-700">
                <p className="font-medium text-foreground-950">Fahrzeug-Prüfung Staig</p>
                <p>FSP Fahrzeug-Sicherheitsprüfung</p>
                <p>{address}</p>
              </div>
              <a
                href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x479961fbf591de99:0xb9befdd7a62ba20f"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-accent-500 hover:underline font-medium"
              >
                <i className="ri-map-2-line w-4 h-4 flex items-center justify-center"></i>
                In Google Maps anzeigen
              </a>
            </div>

            <div className="bg-white rounded-md border border-background-200/70 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                <i className="ri-phone-line w-6 h-6 flex items-center justify-center text-accent-700"></i>
              </div>
              <h3 className="text-base font-semibold text-foreground-950 mb-3">Telefon</h3>
              <div className="space-y-2 text-sm text-foreground-700">
                <p className="flex items-center gap-2">
                  <i className="ri-phone-line w-4 h-4 flex items-center justify-center text-foreground-400"></i>
                  <a href={`tel:${phone}`} className="text-accent-500 hover:underline font-semibold">{phone}</a>
                </p>
                <p className="flex items-center gap-2">
                  <i className="ri-smartphone-line w-4 h-4 flex items-center justify-center text-foreground-400"></i>
                  <a href={`tel:${phoneMobile}`} className="text-accent-500 hover:underline font-semibold">{phoneMobile}</a>
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full h-[300px] md:h-[400px] rounded-md overflow-hidden border border-background-200/70 mb-8 shadow-lg">
            <iframe
              title="Standort Fahrzeug-Prüfung Staig"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.0!2d10.0!3d48.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479961fbf591de99%3A0xb9befdd7a62ba20f!2sFahrzeug-Pr%C3%BCfung%20Staig!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-md border border-background-200/70 p-6">
            <img src={logoUrl} alt="FSP Logo" className="h-12 w-auto" />
            <div className="text-sm text-foreground-700">
              <p className="font-semibold text-foreground-950">FSP Fahrzeug-Sicherheitsprüfung GmbH & Co. KG</p>
              <p>TÜV Rheinland zertifizierter Prüfstützpunkt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}