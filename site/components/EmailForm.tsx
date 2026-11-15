"use client";

import { useId, useState } from "react";

/** Email capture. Prototype: nothing is sent anywhere. [TO FILL] connect to the real list. */
export function EmailForm({ cta = "Get drop alerts", done = "You're on the list.", primary = false }: { cta?: string; done?: string; primary?: boolean }) {
  const [sent, setSent] = useState(false);
  const id = useId();
  if (sent)
    return (
      <p role="status" className="py-3 text-[17px]">
        {done} <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/60">(demo · nothing sent)</span>
      </p>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex w-full flex-col gap-3 sm:flex-row"
    >
      <label htmlFor={id} className="sr-only">Email address</label>
      <input id={id} type="email" required autoComplete="email" placeholder="your@email.com" className="field flex-1" />
      <button type="submit" className={primary ? "btn-primary" : "btn-ghost"}>{cta}</button>
    </form>
  );
}
