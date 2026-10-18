import { useState, useMemo, useCallback } from "react";
import { categories } from "@/mocks/de/booking";
import { type Service } from "@/mocks/de/booking";
import { phone } from "@/mocks/de/navigation";
import BookingStepper from "./components/BookingStepper";
import CategorySelection from "./components/CategorySelection";
import ServiceSelection from "./components/ServiceSelection";
import DateTimeSelection from "./components/DateTimeSelection";
import CustomerDetails, { type CustomerData } from "./components/CustomerDetails";
import BookingSummary from "./components/BookingSummary";
import Confetti from "./components/Confetti";

const steps = ["Kategorie", "Service", "Termin", "Daten", "Bestätigen"];

export default function TerminVereinbaren() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const activeCategory = useMemo(() => {
    if (selectedCategory === "all") return null;
    return categories.find((c) => c.id === selectedCategory) || null;
  }, [selectedCategory]);

  const activeServices = useMemo(() => {
    if (selectedCategory === "all") {
      return categories.filter((c) => c.id !== "all").flatMap((c) => c.services);
    }
    return categories.find((c) => c.id === selectedCategory)?.services || [];
  }, [selectedCategory]);

  const activeService = useMemo(() => {
    return activeServices.find((s) => s.id === selectedService) || null;
  }, [activeServices, selectedService]);

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: Record<string, string> = {};

      if (step === 1) {
        if (!selectedCategory || selectedCategory === "all") {
          newErrors.category = "Bitte wählen Sie eine Fahrzeugkategorie aus.";
        }
      }

      if (step === 2) {
        if (!selectedService) {
          newErrors.service = "Bitte wählen Sie einen Dienst aus.";
        }
      }

      if (step === 3) {
        if (!selectedDate) {
          newErrors.date = "Bitte wählen Sie ein Datum aus.";
        }
        if (!selectedTime) {
          newErrors.time = "Bitte wählen Sie eine Uhrzeit aus.";
        }
      }

      if (step === 4) {
        if (!customerData.firstName.trim()) {
          newErrors.firstName = "Vorname ist erforderlich";
        }
        if (!customerData.lastName.trim()) {
          newErrors.lastName = "Nachname ist erforderlich";
        }
        if (!customerData.email.trim()) {
          newErrors.email = "E-Mail ist erforderlich";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
          newErrors.email = "Bitte gültige E-Mail-Adresse eingeben";
        }
        if (!customerData.phone.trim()) {
          newErrors.phone = "Telefonnummer ist erforderlich";
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [selectedCategory, selectedService, selectedDate, selectedTime, customerData]
  );

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep((s) => s + 1);
        setErrors({});
        setAnimKey((k) => k + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      setErrors({});
      setAnimKey((k) => k + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedCategory("all");
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerData({ firstName: "", lastName: "", email: "", phone: "", note: "" });
    setErrors({});
    setSubmitted(false);
    setAnimKey(0);
  };

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
    const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const monthsDE = [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember",
    ];
    return `${days[dateObj.getDay()]}, ${d}. ${monthsDE[dateObj.getMonth()]} ${y}`;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background-50 via-background-50 to-primary-50/30 flex items-center justify-center">
        {/* Confetti celebration */}
        <Confetti />

        {/* Decorative blobs */}
        <div className="fixed top-20 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-lg mx-auto px-4 py-12">
          <div className="text-center animate-fade-in-up" key={animKey}>
            {/* Success icon with spin animation */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-xl shadow-primary-500/30">
                <i className="ri-check-line w-12 h-12 flex items-center justify-center text-background-50 animate-[scaleCheck_0.5s_ease-out]" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950 mb-3">
              Termin angefragt
            </h1>
            <p className="text-sm text-foreground-500 mb-10 leading-relaxed max-w-sm mx-auto">
              Vielen Dank, <strong className="text-foreground-900">{customerData.firstName}</strong>! Wir melden uns zeitnah mit einer
              Bestätigung bei Ihnen.
            </p>

            <div className="bg-white rounded-2xl border border-background-200/60 p-6 text-left mb-8 shadow-xl shadow-black/5">
              <h4 className="text-[11px] font-bold text-foreground-400 uppercase tracking-widest mb-5">
                Ihre Buchung
              </h4>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-foreground-500">Service</span>
                  <span className="font-bold text-foreground-950 text-right max-w-[60%]">
                    {activeService?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground-500">Datum</span>
                  <span className="font-bold text-foreground-950">
                    {selectedDate ? formatDate(selectedDate) : "–"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground-500">Uhrzeit</span>
                  <span className="font-bold text-foreground-950">{selectedTime} Uhr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground-500">Name</span>
                  <span className="font-bold text-foreground-950">
                    {customerData.firstName} {customerData.lastName}
                  </span>
                </div>
                {activeService?.price && (
                  <div className="flex items-center justify-between pt-3 border-t border-background-200">
                    <span className="text-foreground-500">Preis</span>
                    <span className="font-bold text-foreground-950 text-lg">{activeService.price}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-accent-500 text-background-50 font-bold text-sm rounded-xl hover:shadow-xl hover:shadow-primary-500/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line w-4 h-4 flex items-center justify-center" />
              Neuen Termin anfragen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-50 via-background-50 to-primary-50/20">
      {/* Decorative background blobs */}
      <div className="fixed top-40 -left-20 w-80 h-80 bg-primary-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-40 -right-20 w-80 h-80 bg-accent-500/4 rounded-full blur-3xl pointer-events-none" />

      <h1 className="sr-only">Termin für Ihre Fahrzeugprüfung in Staig online vereinbaren</h1>

      {/* Sticky stepper bar */}
      <div className="sticky top-0 z-20 bg-background-50/85 backdrop-blur-xl border-b border-background-200/40">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <BookingStepper currentStep={currentStep} steps={steps} />
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10" key={animKey}>
        <div className="animate-fade-in-up">

          {/* Step 1 – Kategorie */}
          {currentStep === 1 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-background-200/40 shadow-xl shadow-black/[0.02] p-6 md:p-10">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-500 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
                  <i className="ri-car-line w-3 h-3 flex items-center justify-center" />
                  Schritt 1 von 5
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-2">
                  Fahrzeugkategorie wählen
                </h2>
                <p className="text-sm text-foreground-500 leading-relaxed">
                  Für welches Fahrzeug möchten Sie einen Termin vereinbaren?
                </p>
              </div>

              <CategorySelection
                selected={selectedCategory}
                onSelect={(id) => {
                  setSelectedCategory(id);
                  setSelectedService(null);
                  setErrors((prev) => ({ ...prev, category: "" }));
                }}
              />
              {errors.category && (
                <div className="mt-5 text-sm text-primary-500 bg-primary-50 rounded-xl px-4 py-3 flex items-center gap-2 animate-fade-in-up">
                  <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center flex-shrink-0" />
                  {errors.category}
                </div>
              )}
            </div>
          )}

          {/* Step 2 – Service */}
          {currentStep === 2 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-background-200/40 shadow-xl shadow-black/[0.02] p-6 md:p-10">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-500 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
                  <i className="ri-hammer-line w-3 h-3 flex items-center justify-center" />
                  Schritt 2 von 5
                </span>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950">
                    Dienst auswählen
                  </h2>
                  {activeCategory && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background-100 text-foreground-700 text-xs font-semibold rounded-full border border-background-200">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
                      {activeCategory.name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground-500 leading-relaxed">
                  Welche Prüfung oder Dienstleistung brauchen Sie?
                </p>
              </div>

              <ServiceSelection
                services={activeServices}
                selected={selectedService}
                onSelect={(id) => {
                  setSelectedService(id);
                  setErrors((prev) => ({ ...prev, service: "" }));
                }}
              />
              {errors.service && (
                <div className="mt-5 text-sm text-primary-500 bg-primary-50 rounded-xl px-4 py-3 flex items-center gap-2 animate-fade-in-up">
                  <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center flex-shrink-0" />
                  {errors.service}
                </div>
              )}
            </div>
          )}

          {/* Step 3 – Termin */}
          {currentStep === 3 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-background-200/40 shadow-xl shadow-black/[0.02] p-6 md:p-10">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-500 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
                  <i className="ri-calendar-line w-3 h-3 flex items-center justify-center" />
                  Schritt 3 von 5
                </span>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950">
                    Termin wählen
                  </h2>
                  {activeService && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background-100 text-foreground-700 text-xs font-semibold rounded-full border border-background-200">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
                      {activeService.name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground-500 leading-relaxed">
                  Wählen Sie Datum und Uhrzeit für Ihren Wunschtermin
                </p>
              </div>

              <DateTimeSelection
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                  setErrors((prev) => ({ ...prev, date: "" }));
                }}
                onSelectTime={(time) => {
                  setSelectedTime(time);
                  setErrors((prev) => ({ ...prev, time: "" }));
                }}
              />
              {(errors.date || errors.time) && (
                <div className="mt-6 text-sm text-primary-500 bg-primary-50 rounded-xl px-4 py-3 flex items-center gap-2 animate-fade-in-up">
                  <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center flex-shrink-0" />
                  {errors.date || errors.time}
                </div>
              )}
            </div>
          )}

          {/* Step 4 – Daten */}
          {currentStep === 4 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-background-200/40 shadow-xl shadow-black/[0.02] p-6 md:p-10">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-500 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
                  <i className="ri-user-line w-3 h-3 flex items-center justify-center" />
                  Schritt 4 von 5
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-2">
                  Ihre Daten
                </h2>
                <p className="text-sm text-foreground-500 leading-relaxed">
                  Geben Sie Ihre Kontaktdaten für die Terminbestätigung ein
                </p>
              </div>

              <CustomerDetails
                value={customerData}
                onChange={setCustomerData}
                errors={errors}
              />
            </div>
          )}

          {/* Step 5 – Zusammenfassung */}
          {currentStep === 5 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-background-200/40 shadow-xl shadow-black/[0.02] p-6 md:p-10">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-500 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
                  <i className="ri-check-double-line w-3 h-3 flex items-center justify-center" />
                  Schritt 5 von 5
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-2">
                  Zusammenfassung
                </h2>
                <p className="text-sm text-foreground-500 leading-relaxed">
                  Bitte überprüfen Sie Ihre Angaben vor dem Absenden
                </p>
              </div>

              <BookingSummary
                category={activeCategory}
                service={activeService}
                date={selectedDate}
                time={selectedTime}
                customer={customerData}
              />

              {activeService && (
                <div className="mt-6 p-5 bg-gradient-to-r from-background-50 to-background-100 rounded-2xl border border-background-200/40 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground-950">{activeService.name}</p>
                    <p className="text-xs text-foreground-500 mt-0.5">{activeService.duration}</p>
                  </div>
                  <span className="text-lg font-bold text-foreground-950">{activeService.price}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
              currentStep === 1
                ? "text-foreground-300 cursor-not-allowed opacity-40"
                : "text-foreground-700 hover:text-foreground-950 bg-white hover:bg-background-50 border border-background-200/60 hover:border-background-300 hover:shadow-md hover:-translate-y-0.5"
            }`}
          >
            <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center" />
            Zurück
          </button>

          {currentStep === 5 ? (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-accent-500 text-background-50 font-bold text-sm rounded-xl hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-calendar-check-line w-4 h-4 flex items-center justify-center" />
              Termin verbindlich buchen
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-accent-500 text-background-50 font-bold text-sm rounded-xl hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 cursor-pointer whitespace-nowrap group"
            >
              Weiter
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Contact hint */}
        <div className="mt-10 text-center pb-8">
          <p className="text-sm text-foreground-400">
            Fragen? Rufen Sie uns an:{" "}
            <a href={`tel:${phone}`} className="text-accent-500 font-bold hover:underline underline-offset-4 decoration-accent-300 transition-all">
              {phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}