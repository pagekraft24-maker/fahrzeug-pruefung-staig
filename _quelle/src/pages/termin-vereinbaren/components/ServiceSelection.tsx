import { type Service } from "@/mocks/de/booking";

interface ServiceSelectionProps {
  services: Service[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function ServiceSelection({ services, selected, onSelect }: ServiceSelectionProps) {
  if (services.length === 0) {
    return (
      <div className="w-full py-16 text-center animate-fade-in-up">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-background-100 flex items-center justify-center">
          <i className="ri-arrow-up-circle-line w-8 h-8 flex items-center justify-center text-foreground-300" />
        </div>
        <p className="text-sm text-foreground-400 font-medium">
          Wählen Sie zuerst eine Kategorie aus
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {services.map((service, index) => {
          const isActive = selected === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id)}
              className={`group relative flex flex-col rounded-2xl border-2 p-5 md:p-6 transition-all duration-500 cursor-pointer animate-fade-in-up overflow-hidden text-left ${
                isActive
                  ? "border-primary-500 bg-gradient-to-b from-primary-50/70 to-primary-50/20 shadow-lg shadow-primary-500/10"
                  : "border-transparent bg-background-100 hover:bg-background-50 hover:border-background-300 hover:shadow-lg hover:-translate-y-0.5"
              }`}
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
            >
              {/* Top row: Icon + Name + Radio */}
              <div className="flex items-start gap-3 mb-4">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30"
                      : "bg-white text-foreground-500 group-hover:text-foreground-800 group-hover:shadow-md"
                  }`}
                >
                  <i
                    className={`w-6 h-6 flex items-center justify-center transition-all duration-500 ${
                      isActive ? "ri-check-double-line text-background-50" : "ri-hammer-line"
                    }`}
                  />
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h4
                    className={`text-[15px] font-semibold leading-snug break-words transition-colors duration-300 ${
                      isActive ? "text-foreground-950" : "text-foreground-900 group-hover:text-foreground-950"
                    }`}
                  >
                    {service.name}
                  </h4>
                </div>

                {/* Radio indicator */}
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 mt-0.5 ${
                    isActive
                      ? "border-primary-500 bg-primary-500 shadow-md shadow-primary-500/30"
                      : "border-background-300 group-hover:border-foreground-300"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-background-50 transition-all duration-300 ${
                      isActive ? "scale-100" : "scale-0"
                    }`}
                  />
                </div>
              </div>

              {/* Description */}
              {service.description && (
                <p className="text-xs text-foreground-500 mb-3 leading-snug line-clamp-1">
                  {service.description}
                </p>
              )}

              {/* Bottom row: Duration + Price */}
              <div className="flex items-center gap-2 mt-auto flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs text-foreground-600 bg-white rounded-lg px-2.5 py-1.5 shadow-sm whitespace-nowrap">
                  <i className="ri-time-line w-3.5 h-3.5 flex items-center justify-center text-foreground-400" />
                  {service.duration}
                </span>
                <span
                  className={`inline-flex items-center text-xs font-bold rounded-lg px-2.5 py-1.5 transition-all duration-500 whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-primary-500 to-accent-500 text-background-50 shadow-sm"
                      : "bg-white text-foreground-900 shadow-sm"
                  }`}
                >
                  {service.price}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}