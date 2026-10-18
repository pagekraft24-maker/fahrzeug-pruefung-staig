import { categories } from "@/mocks/de/booking";

interface CategorySelectionProps {
  selected: string;
  onSelect: (id: string) => void;
}

const categoryIcons: Record<string, string> = {
  pkw: "ri-car-line",
  "anhaenger-ohne": "ri-car-line",
  "anhaenger-mit": "ri-truck-line",
  "wohnmobil-bis": "ri-bus-line",
  "wohnmobil-ab": "ri-bus-line",
  transporter: "ri-truck-line",
  wohnwagen: "ri-home-line",
  oldtimer: "ri-vip-crown-line",
  zugmaschine: "ri-settings-3-line",
  sonstiges: "ri-more-line",
};

export default function CategorySelection({ selected, onSelect }: CategorySelectionProps) {
  const displayCategories = categories.filter((c) => c.id !== "all");

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {displayCategories.map((cat, index) => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-500 cursor-pointer animate-fade-in-up overflow-hidden ${
                isActive
                  ? "border-primary-500 bg-gradient-to-b from-primary-50/80 to-primary-50/30 shadow-lg shadow-primary-500/10"
                  : "border-transparent bg-background-100 hover:bg-background-50 hover:border-background-300 hover:shadow-md hover:-translate-y-0.5"
              }`}
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
            >
              {/* Background glow on active */}
              {isActive && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-primary-500/20 blur-xl rounded-full" />
              )}

              {/* Icon container */}
              <div
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30 scale-110"
                    : "bg-white text-foreground-500 group-hover:text-foreground-900 group-hover:scale-105 group-hover:shadow-md"
                }`}
              >
                <i
                  className={`${categoryIcons[cat.id] || "ri-car-line"} w-6 h-6 flex items-center justify-center transition-all duration-500 ${
                    isActive ? "text-background-50" : ""
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-xs font-semibold text-center leading-snug transition-all duration-300 ${
                  isActive ? "text-foreground-950" : "text-foreground-700 group-hover:text-foreground-950"
                }`}
              >
                {cat.name}
              </span>

              {/* Active check badge */}
              <div
                className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "bg-primary-500 scale-100 opacity-100"
                    : "bg-primary-500 scale-50 opacity-0"
                }`}
              >
                <i className="ri-check-line w-3 h-3 flex items-center justify-center text-background-50" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}