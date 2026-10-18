interface BookingStepperProps {
  currentStep: number;
  steps: string[];
}

export default function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <div className="w-full">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;

            return (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                {/* Dot + Label */}
                <div className="flex flex-col items-center gap-2.5 group">
                  {/* Outer glow ring (active only) */}
                  <div className="relative">
                    {isActive && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-primary-500/30 animate-ping-slow" />
                        <div className="absolute -inset-1 rounded-full bg-primary-500/20 animate-pulse" />
                      </>
                    )}
                    <div
                      className={`relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-700 ${
                        isCompleted
                          ? "bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25 scale-100"
                          : isActive
                            ? "bg-gradient-to-br from-primary-500 to-accent-500 shadow-xl shadow-primary-500/30 scale-110"
                            : "bg-background-200 group-hover:bg-background-300"
                      }`}
                    >
                      {isCompleted ? (
                        <i className="ri-check-line w-5 h-5 flex items-center justify-center text-background-50 animate-[scaleCheck_0.4s_ease-out]" />
                      ) : (
                        <span
                          className={`text-sm font-bold transition-all duration-500 ${
                            isActive ? "text-background-50 text-base" : "text-foreground-500"
                          }`}
                        >
                          {stepNum}
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-[11px] md:text-xs font-semibold whitespace-nowrap transition-all duration-500 ${
                      isActive
                        ? "text-foreground-950 scale-110"
                        : isCompleted
                          ? "text-foreground-800"
                          : "text-foreground-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2 md:mx-4 mb-5">
                    <div className="h-[3px] rounded-full bg-background-200 relative overflow-hidden">
                      {/* Completed fill */}
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-700 ease-out"
                        style={{ width: isCompleted ? "100%" : "0%" }}
                      />
                      {/* Shimmer on completed */}
                      {isCompleted && (
                        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-background-50/40 to-transparent animate-shimmer" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress text */}
      <div className="text-center mt-4">
        <span className="text-xs text-foreground-400 font-medium tracking-wide">
          Schritt {currentStep} von {steps.length}
        </span>
        <div className="mt-1.5 h-1 bg-background-200 rounded-full max-w-xs mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}