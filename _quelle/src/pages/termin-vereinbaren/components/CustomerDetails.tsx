import { useState, useRef } from "react";

interface CustomerDetailsProps {
  onChange: (data: CustomerData) => void;
  value: CustomerData;
  errors: Record<string, string>;
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
}

interface FloatingFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  icon?: string;
  prefix?: string;
  multiline?: boolean;
  maxLength?: number;
  placeholder?: string;
}

function FloatingField({
  label,
  required,
  error,
  value,
  onChange,
  type = "text",
  icon,
  prefix,
  multiline,
  maxLength,
  placeholder,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const isActive = focused || value.length > 0;

  const hasLeftDecoration = !!(prefix || icon);
  const leftPadding = prefix ? "pl-16" : icon ? "pl-11" : "pl-5";

  const inputClasses = `peer w-full bg-white rounded-xl text-foreground-900 text-sm outline-none transition-all duration-300 border-2 placeholder-transparent ${
    error
      ? "border-primary-500"
      : focused
        ? "border-accent-500 bg-accent-50/20"
        : "border-background-200 hover:border-background-300"
  }`;

  const labelInactiveY = multiline ? "top-[16px]" : "top-1/2 -translate-y-1/2";
  const labelLeftOffset = prefix ? "left-14" : icon ? "left-9" : "left-5";

  return (
    <div className="relative">
      {/* Prefix */}
      {prefix && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10 pointer-events-none select-none">
          <span className="text-xs text-foreground-400 font-medium">{prefix}</span>
          <span className="w-px h-3 bg-background-200" />
        </div>
      )}
      {/* Icon */}
      {icon && !prefix && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <i className={`${icon} w-4 h-4 flex items-center justify-center transition-colors duration-300 ${focused ? "text-accent-500" : "text-foreground-300"}`} />
        </div>
      )}

      {multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          placeholder={placeholder || label}
          rows={3}
          className={`${inputClasses} ${leftPadding} pt-6 pb-3 resize-none`}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder || label}
          className={`${inputClasses} ${leftPadding} pt-6 pb-3`}
        />
      )}

      {/* Floating Label */}
      <label
        onClick={() => inputRef.current?.focus()}
        className={`absolute cursor-text transition-all duration-300 select-none z-10 ${
          isActive
            ? `${labelLeftOffset} top-2 text-[10px] font-semibold ${error ? "text-primary-500" : focused ? "text-accent-500" : "text-foreground-400"}`
            : `${labelLeftOffset} ${labelInactiveY} text-sm text-foreground-400`
        }`}
      >
        {label}
        {required && <span className="text-primary-500 ml-0.5">*</span>}
      </label>

      {/* Subtle focus ring glow */}
      {focused && !error && (
        <div className="absolute inset-0 rounded-xl pointer-events-none ring-[3px] ring-accent-500/15 transition-all duration-300" />
      )}

      {/* Error message */}
      {error && (
        <p className="text-xs text-primary-500 mt-1.5 ml-1 flex items-center gap-1 animate-fade-in-up">
          <i className="ri-error-warning-line w-3 h-3 flex items-center justify-center flex-shrink-0" />
          {error}
        </p>
      )}

      {/* Char counter for multiline */}
      {maxLength && isActive && (
        <p className="text-[10px] text-foreground-300 text-right mt-1">{value.length}/{maxLength}</p>
      )}
    </div>
  );
}

export default function CustomerDetails({ onChange, value, errors }: CustomerDetailsProps) {
  const handleChange = (field: keyof CustomerData, val: string) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="w-full">
      <div className="bg-background-50/80 rounded-2xl border border-background-200/50 p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          <FloatingField
            label="Vorname"
            required
            icon="ri-user-line"
            value={value.firstName}
            onChange={(v) => handleChange("firstName", v)}
            error={errors.firstName}
          />

          <FloatingField
            label="Nachname"
            required
            icon="ri-user-line"
            value={value.lastName}
            onChange={(v) => handleChange("lastName", v)}
            error={errors.lastName}
          />

          <FloatingField
            label="E-Mail"
            required
            type="email"
            icon="ri-mail-line"
            value={value.email}
            onChange={(v) => handleChange("email", v)}
            error={errors.email}
          />

          <FloatingField
            label="Telefon"
            required
            type="tel"
            prefix="+49"
            value={value.phone}
            onChange={(v) => handleChange("phone", v)}
            error={errors.phone}
          />

          <div className="sm:col-span-2">
            <FloatingField
              label="Notiz (optional)"
              multiline
              maxLength={500}
              icon="ri-chat-1-line"
              value={value.note}
              onChange={(v) => handleChange("note", v)}
              placeholder="z.B. besondere Wünsche oder Hinweise zum Fahrzeug..."
            />
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="mt-5 flex items-center gap-2 text-xs text-foreground-400">
        <i className="ri-information-line w-3.5 h-3.5 flex items-center justify-center flex-shrink-0" />
        <span>Mit <span className="text-primary-500">*</span> markierte Felder sind Pflichtfelder</span>
      </div>
    </div>
  );
}