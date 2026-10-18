export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  services: Service[];
}

export const categories: Category[] = [
  {
    id: "all",
    name: "ALLES",
    services: [],
  },
  {
    id: "pkw",
    name: "PKW bis 3,5 t",
    services: [
      { id: "nachpruefung", name: "Nachprüfung", duration: "15 m", price: "31,00 €" },
      { id: "nachkontrolle", name: "Nachkontrolle", duration: "15 m", price: "17,50 €" },
      { id: "hu-au", name: "Hauptuntersuchung mit Abgasuntersuchung", duration: "45 m", price: "153,00 €" },
      { id: "sicherheitspruefung", name: "Sicherheitsprüfung", duration: "30 m", price: "50,60 €" },
      { id: "taxi-hu", name: "Taxi, Mietwagen Hauptuntersuchung mit Abgasuntersuchung", duration: "45 m", price: "164,60 €", description: "einschließlich BOKraft" },
      { id: "hu-gwp", name: "Hauptuntersuchung mit Abgasuntersuchung und GWP", duration: "45 m", price: "189,00 €" },
    ],
  },
  {
    id: "anhaenger-ohne",
    name: "Anhänger ohne Bremse",
    services: [
      { id: "anhaenger-ohne-hu", name: "Hauptuntersuchung", duration: "30 m", price: "45,00 €" },
      { id: "anhaenger-ohne-nachpruefung", name: "Nachprüfung", duration: "15 m", price: "22,50 €" },
    ],
  },
  {
    id: "anhaenger-mit",
    name: "Anhänger mit Bremse",
    services: [
      { id: "anhaenger-mit-hu", name: "Hauptuntersuchung", duration: "30 m", price: "55,00 €" },
      { id: "anhaenger-mit-nachpruefung", name: "Nachprüfung", duration: "15 m", price: "27,50 €" },
    ],
  },
  {
    id: "wohnmobil-bis",
    name: "Wohnmobil bis 3,5 t",
    services: [
      { id: "wohnmobil-bis-hu", name: "Hauptuntersuchung mit Abgasuntersuchung", duration: "45 m", price: "153,00 €" },
      { id: "wohnmobil-bis-gas", name: "Gasprüfung GAP/GWP", duration: "30 m", price: "89,00 €" },
      { id: "wohnmobil-bis-hu-gas", name: "Hauptuntersuchung mit Abgasuntersuchung und GWP", duration: "45 m", price: "189,00 €" },
    ],
  },
  {
    id: "wohnmobil-ab",
    name: "Wohnmobil ab 3,5 t",
    services: [
      { id: "wohnmobil-ab-hu", name: "Hauptuntersuchung mit Abgasuntersuchung", duration: "60 m", price: "183,00 €" },
      { id: "wohnmobil-ab-gas", name: "Gasprüfung GAP/GWP", duration: "30 m", price: "89,00 €" },
      { id: "wohnmobil-ab-hu-gas", name: "Hauptuntersuchung mit Abgasuntersuchung und GWP", duration: "60 m", price: "219,00 €" },
    ],
  },
  {
    id: "transporter",
    name: "Transporter und LKW ab 3,5 t",
    services: [
      { id: "transporter-hu", name: "Hauptuntersuchung mit Abgasuntersuchung", duration: "60 m", price: "183,00 €" },
      { id: "transporter-sicherheit", name: "Sicherheitsprüfung", duration: "45 m", price: "75,00 €" },
    ],
  },
  {
    id: "wohnwagen",
    name: "Wohnwagen",
    services: [
      { id: "wohnwagen-hu", name: "Hauptuntersuchung", duration: "45 m", price: "55,00 €" },
      { id: "wohnwagen-gas", name: "Gasprüfung GAP/GWP", duration: "30 m", price: "89,00 €" },
    ],
  },
  {
    id: "oldtimer",
    name: "Oldtimer",
    services: [
      { id: "oldtimer-gutachten", name: "Oldtimergutachten", duration: "60 m", price: "145,00 €" },
      { id: "oldtimer-hu", name: "Hauptuntersuchung mit Abgasuntersuchung", duration: "45 m", price: "153,00 €" },
      { id: "oldtimer-wertgutachten", name: "Oldtimerwertgutachten", duration: "90 m", price: "195,00 €" },
    ],
  },
  {
    id: "zugmaschine",
    name: "Zugmaschinen bis 40 km/h",
    services: [
      { id: "zugmaschine-hu", name: "Hauptuntersuchung", duration: "45 m", price: "95,00 €" },
      { id: "zugmaschine-sicherheit", name: "Sicherheitsprüfung", duration: "30 m", price: "50,00 €" },
    ],
  },
  {
    id: "sonstiges",
    name: "Sonstiges",
    services: [
      { id: "sonst-aenderung", name: "Änderungsabnahme", duration: "45 m", price: "85,00 €" },
      { id: "sonst-bokraft", name: "BOKraft-Prüfung", duration: "30 m", price: "45,00 €" },
      { id: "sonst-feinstaub", name: "Feinstaubplakette", duration: "15 m", price: "6,00 €" },
      { id: "sonst-tempo100", name: "Tempo 100 Zulassung für Anhänger", duration: "30 m", price: "35,00 €" },
      { id: "sonst-schaden", name: "Schaden- und Wertgutachten", duration: "60 m", price: "120,00 €" },
      { id: "sonst-uvv", name: "UVV und Betriebssicherheitsprüfung", duration: "45 m", price: "95,00 €" },
    ],
  },
];

export const allServices = categories.flatMap((c) => c.services);

export const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
  "15:00", "15:30", "16:00", "16:30", "17:00",
];

export const weekdays = [
  "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag",
];

export const weekdaysShort = [
  "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa",
];

export const months = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];