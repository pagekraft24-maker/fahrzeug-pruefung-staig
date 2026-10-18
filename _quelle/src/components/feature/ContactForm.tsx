import { useState } from "react";

interface ContactFormProps {
  dark?: boolean;
}

export default function ContactForm({ dark = false }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: "", message: "", gdpr: false });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.gdpr) {
      setError("Bitte füllen Sie alle erforderlichen Felder aus.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const inputClass = dark
    ? "w-full bg-foreground-800 border border-foreground-700 rounded-lg text-white placeholder-foreground-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    : "w-full bg-white border border-background-200 rounded-lg text-foreground-900 placeholder-foreground-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent";

  const labelClass = dark ? "text-white text-sm font-medium" : "text-foreground-900 text-sm font-medium";

  return (
    <div className={dark ? "w-full bg-foreground-900 py-16 md:py-24 px-4 md:px-6 lg:px-8" : "w-full py-12 px-4 md:px-6 lg:px-8"}>
      <div className="max-w-3xl mx-auto">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary-500 flex items-center justify-center">
              <i className="ri-check-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Nachricht wurde erfolgreich gesendet</h3>
            <p className="text-foreground-400">Vielen Dank für Ihre Nachricht. Wir melden uns bei Ihnen.</p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: "", message: "", gdpr: false }); }}
              className="mt-6 px-6 py-2 bg-primary-500 text-foreground-950 font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              Neue Nachricht
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-lg mb-4 ${dark ? "bg-primary-500 text-foreground-950" : "bg-primary-100 text-primary-700"}`}>
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
                Kontaktieren Sie uns
              </div>
              <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${dark ? "text-white" : "text-foreground-950"}`}>
                Schreiben Sie uns
              </h2>
              <p className={`text-sm ${dark ? "text-foreground-400" : "text-foreground-600"}`}>
                Haben Sie Fragen oder Anmerkungen? Wir sind für Sie da.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`${labelClass} block mb-2`}>
                  Name <span className="text-primary-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={200}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  placeholder="Ihr Name"
                />
              </div>
              <div>
                <label className={`${labelClass} block mb-2`}>Nachricht</label>
                <textarea
                  rows={6}
                  maxLength={500}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={inputClass}
                  placeholder="Ihre Nachricht..."
                ></textarea>
                <p className={`text-xs mt-1 ${dark ? "text-foreground-500" : "text-foreground-500"}`}>Max. 500 Zeichen</p>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdpr"
                  checked={formData.gdpr}
                  onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-primary-500 rounded"
                />
                <label htmlFor="gdpr" className={`${labelClass} text-xs leading-relaxed`}>
                  Ich bin damit einverstanden, dass diese Daten zum Zwecke der Kontaktaufnahme gespeichert und verarbeitet werden. Mir ist bekannt, dass ich meine Einwilligung jederzeit widerrufen kann.<span className="text-primary-500">*</span>
                </label>
              </div>
              {error && (
                <div className="text-primary-500 text-sm bg-primary-50 rounded-lg px-4 py-2">{error}</div>
              )}
              <button
                type="submit"
                className="w-full py-3.5 bg-primary-500 text-foreground-950 font-semibold text-sm rounded-lg hover:bg-primary-600 transition-colors"
              >
                <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center inline-block mr-2"></i>
                Nachricht senden
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}