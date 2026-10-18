import { type Service, type Category } from "@/mocks/de/booking";
import { type CustomerData } from "./CustomerDetails";

interface BookingSummaryProps {
  category: Category | null;
  service: Service | null;
  date: string | null;
  time: string | null;
  customer: CustomerData;
}

export default function BookingSummary({
  category,
  service,
  date,
  time,
  customer,
}: BookingSummaryProps) {
  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
    const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const months = [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember",
    ];
    return `${days[dateObj.getDay()]}, ${d}. ${months[dateObj.getMonth()]} ${y}`;
  };

  const sections = [
    {
      icon: "ri-hammer-line",
      bg: "from-primary-500 to-accent-500",
      label: "Gewählter Service",
      delay: "0ms",
      content: (
        <div>
          <p className="text-base font-bold text-foreground-950">{service?.name || "–"}</p>
          {category && (
            <p className="text-sm text-foreground-500 mt-0.5">{category.name}</p>
          )}
          <div className="flex items-center gap-3 mt-3">
            {service?.duration && (
              <span className="inline-flex items-center gap-1.5 text-xs text-foreground-600 bg-background-50 rounded-lg px-2.5 py-1.5 shadow-sm">
                <i className="ri-time-line w-3.5 h-3.5 flex items-center justify-center text-foreground-400" />
                {service.duration}
              </span>
            )}
            {service?.price && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-background-50 rounded-lg px-3 py-1.5 shadow-md shadow-primary-500/20">
                {service.price}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      icon: "ri-calendar-check-line",
      bg: "from-accent-500 to-accent-600",
      label: "Termin",
      delay: "100ms",
      content: (
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-foreground-400 font-medium mb-0.5">Datum</p>
            <p className="text-sm font-bold text-foreground-950">
              {date ? formatDate(date) : "–"}
            </p>
          </div>
          <div className="w-px h-8 bg-background-200" />
          <div>
            <p className="text-xs text-foreground-400 font-medium mb-0.5">Uhrzeit</p>
            <p className="text-sm font-bold text-foreground-950">
              {time ? `${time} Uhr` : "–"}
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: "ri-user-heart-line",
      bg: "from-secondary-500 to-secondary-600",
      label: "Ihre Daten",
      delay: "200ms",
      content: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <i className="ri-user-line w-3.5 h-3.5 flex items-center justify-center text-foreground-400" />
            <span className="text-sm font-semibold text-foreground-950">
              {customer.firstName} {customer.lastName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-mail-line w-3.5 h-3.5 flex items-center justify-center text-foreground-400" />
            <span className="text-sm text-foreground-700">{customer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-phone-line w-3.5 h-3.5 flex items-center justify-center text-foreground-400" />
            <span className="text-sm text-foreground-700">{customer.phone}</span>
          </div>
          {customer.note && (
            <div className="mt-3 bg-background-50 rounded-xl p-3.5 border border-background-200/60">
              <p className="text-[10px] text-foreground-400 font-semibold uppercase tracking-wider mb-1.5">Notiz</p>
              <p className="text-sm text-foreground-800 leading-relaxed">{customer.note}</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div
          key={section.label}
          className="bg-background-100 rounded-2xl p-5 md:p-6 transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: section.delay, animationFillMode: "both" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${section.bg} flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/10`}>
              <i className={`${section.icon} w-4.5 h-4.5 flex items-center justify-center text-background-50`} />
            </div>
            <span className="text-[11px] font-bold text-foreground-500 uppercase tracking-widest">
              {section.label}
            </span>
          </div>
          <div className="ml-12">
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
}