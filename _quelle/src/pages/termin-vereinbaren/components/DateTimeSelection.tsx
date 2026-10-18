import { useState, useMemo } from "react";
import { timeSlots } from "@/mocks/de/booking";

const weekdaysFromMonday = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const monthNames = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const monthNamesShort = [
  "Jan.", "Feb.", "März", "Apr.", "Mai", "Juni",
  "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez.",
];

const getMonday = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

interface DateTimeSelectionProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

export default function DateTimeSelection({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: DateTimeSelectionProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [weekOffset, setWeekOffset] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const maxWeekOffset = 14;

  const startMonday = useMemo(() => {
    const base = getMonday(today);
    base.setDate(base.getDate() + weekOffset * 7);
    return base;
  }, [weekOffset]);

  const twoWeeks = useMemo(() => {
    const days: Date[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(startMonday);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  }, [startMonday]);

  const isDateDisabled = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return dateStr < todayStr || date.getDay() === 0;
  };

  const toDateStr = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const canGoBack = weekOffset > 0;
  const canGoForward = weekOffset < maxWeekOffset;

  const week1Start = twoWeeks[0];
  const week2Start = twoWeeks[7];
  const week1Num = getWeekNumber(week1Start);
  const week2Num = getWeekNumber(week2Start);

  const week1End = new Date(week1Start);
  week1End.setDate(week1End.getDate() + 6);
  const week2End = new Date(week2Start);
  week2End.setDate(week2End.getDate() + 6);

  const formatDateForSlot = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return `${days[date.getDay()]}, ${Number(d)}. ${monthNamesShort[date.getMonth()]} ${y}`;
  };

  const handlePrevWeeks = () => {
    if (!canGoBack) return;
    setDirection("left");
    setWeekOffset((o) => o - 1);
  };

  const handleNextWeeks = () => {
    if (!canGoForward) return;
    setDirection("right");
    setWeekOffset((o) => o + 1);
  };

  const week1Days = twoWeeks.slice(0, 7);
  const week2Days = twoWeeks.slice(7, 14);

  const renderDay = (date: Date) => {
    const dateStr = toDateStr(date);
    const disabled = isDateDisabled(date);
    const selected = selectedDate === dateStr;
    const isToday = dateStr === todayStr;
    const weekdayIdx = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const weekdayLabel = weekdaysFromMonday[weekdayIdx];
    const dayNum = date.getDate();

    return (
      <button
        key={dateStr}
        onClick={() => {
          if (!disabled) onSelectDate(dateStr);
        }}
        disabled={disabled}
        className={`relative flex flex-col items-center justify-center rounded-xl transition-all duration-300 py-2.5 px-1 ${
          selected
            ? "bg-gradient-to-br from-primary-500 to-accent-500 text-background-50 shadow-lg shadow-primary-500/25 scale-[1.04] z-[1]"
            : disabled
              ? "text-foreground-200 cursor-not-allowed"
              : isToday
                ? "bg-accent-500/8 text-accent-700 hover:bg-accent-500/16 hover:scale-[1.04] cursor-pointer font-bold"
                : "text-foreground-800 hover:bg-white hover:shadow-md hover:scale-[1.04] cursor-pointer font-medium"
        }`}
      >
        <span className={`text-[10px] uppercase tracking-wider leading-tight ${selected ? "text-background-50/70" : disabled ? "text-foreground-200" : "text-foreground-400"}`}>
          {weekdayLabel}
        </span>
        <span className={`text-base leading-tight mt-0.5 ${selected ? "font-bold" : disabled ? "" : "font-semibold"}`}>
          {dayNum}.
        </span>
        {isToday && !selected && (
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-500" />
        )}
      </button>
    );
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Calendar area – 3 columns on desktop */}
        <div className="lg:col-span-3 bg-gradient-to-b from-background-50 to-background-100 rounded-2xl border border-background-200/60 p-5 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={handlePrevWeeks}
              disabled={!canGoBack}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                canGoBack
                  ? "hover:bg-white hover:shadow-md cursor-pointer group"
                  : "opacity-30 cursor-not-allowed"
              }`}
            >
              <i className="ri-arrow-left-s-line w-5 h-5 flex items-center justify-center text-foreground-500 group-hover:text-foreground-900 transition-colors" />
            </button>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <i className="ri-calendar-2-line w-4 h-4 flex items-center justify-center text-primary-600" />
                </div>
                <span className="text-base font-heading font-bold text-foreground-950 tracking-tight">
                  {monthNames[week1Start.getMonth()]} {week1Start.getFullYear()}
                </span>
              </div>
              <p className="text-[11px] text-foreground-400 mt-1 font-medium">
                KW {week1Num} – {week1Start.getDate()}.{monthNamesShort[week1Start.getMonth()]} &nbsp;·&nbsp; KW {week2Num} – {week2End.getDate()}.{monthNamesShort[week2End.getMonth()]}
              </p>
            </div>

            <button
              onClick={handleNextWeeks}
              disabled={!canGoForward}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                canGoForward
                  ? "hover:bg-white hover:shadow-md cursor-pointer group"
                  : "opacity-30 cursor-not-allowed"
              }`}
            >
              <i className="ri-arrow-right-s-line w-5 h-5 flex items-center justify-center text-foreground-500 group-hover:text-foreground-900 transition-colors" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {weekdaysFromMonday.map((day) => (
              <div
                key={day}
                className="text-center text-[10px] font-bold text-foreground-400 uppercase tracking-wider py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Two-week grid */}
          <div
            key={`${weekOffset}-${direction}`}
            className="animate-[slideIn_0.28s_ease-out]"
          >
            {/* Week 1 */}
            <div className="grid grid-cols-7 gap-1.5 mb-1.5">
              {week1Days.map(renderDay)}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 my-2.5 px-1">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-background-300 to-transparent" />
              <span className="text-[10px] font-bold text-foreground-300 uppercase tracking-widest whitespace-nowrap">
                KW {week1Num}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-background-300 to-transparent" />
            </div>

            {/* Week 2 */}
            <div className="grid grid-cols-7 gap-1.5">
              {week2Days.map(renderDay)}
            </div>
          </div>

          {/* Quick-jump hint */}
          <div className="mt-5 pt-4 border-t border-background-200/60 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-500/20 border border-accent-500/40" />
              <span className="text-[10px] text-foreground-400 font-medium">Heute</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-primary-500 to-accent-500" />
              <span className="text-[10px] text-foreground-400 font-medium">Ausgewählt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-background-300" />
              <span className="text-[10px] text-foreground-400 font-medium">Frei</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-foreground-300 font-medium line-through">Ausgebucht</span>
            </div>
          </div>
        </div>

        {/* Time slots area – 2 columns on desktop */}
        <div className="lg:col-span-2 bg-gradient-to-b from-background-50 to-background-100 rounded-2xl border border-background-200/60 p-5 md:p-6">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
                <i className="ri-time-line w-4 h-4 flex items-center justify-center text-background-50" />
              </div>
              <h4 className="text-sm font-bold text-foreground-950">Uhrzeit</h4>
            </div>
            {selectedDate ? (
              <p className="text-xs text-foreground-500 ml-10">{formatDateForSlot(selectedDate)}</p>
            ) : (
              <p className="text-xs text-foreground-400 ml-10">Zuerst ein Datum wählen</p>
            )}
          </div>

          {selectedDate ? (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot, index) => {
                const isActive = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => onSelectTime(slot)}
                    className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer animate-fade-in-up whitespace-nowrap ${
                      isActive
                        ? "bg-gradient-to-br from-primary-500 to-accent-500 text-background-50 shadow-lg shadow-primary-500/30 scale-105"
                        : "bg-white text-foreground-800 hover:bg-background-50 hover:shadow-md hover:scale-105 border border-background-200 hover:border-background-300"
                    }`}
                    style={{ animationDelay: `${index * 40}ms`, animationFillMode: "both" }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center animate-fade-in-up">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <i className="ri-calendar-event-line w-8 h-8 flex items-center justify-center text-foreground-200" />
              </div>
              <p className="text-sm text-foreground-400 font-medium">
                Wählen Sie ein Datum aus
              </p>
              <p className="text-xs text-foreground-300 mt-1">
                um verfügbare Uhrzeiten zu sehen
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}