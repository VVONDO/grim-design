/** Line-drawn cap for products without a photo yet. [TO FILL] replace with real photos. */
export function CapPlaceholder({ small = false, label = "Photo coming" }: { small?: boolean; label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/[0.03]">
      <svg viewBox="0 0 200 130" className={small ? "w-16" : "w-1/2 max-w-[280px]"} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2" aria-hidden>
        <path d="M30 92c0-42 26-72 66-72s64 28 66 66" />
        <path d="M96 20c-6 20-8 44-6 70" />
        <path d="M96 20c14 18 22 42 22 68" strokeDasharray="4 5" />
        <path d="M30 92c28-8 78-10 132-6 18 2 30 8 30 14 0 8-26 10-64 8-38-2-80-6-98-16Z" />
        <circle cx="96" cy="20" r="4" />
      </svg>
      {!small && <span className="eyebrow">{label}</span>}
    </div>
  );
}
