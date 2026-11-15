/** Kills the main doubt: "how will it fit me?" */
export function FitGuide({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <section aria-labelledby="fit-title" className="grid gap-10 md:grid-cols-2 md:items-center">
      <div>
        <p className="eyebrow">Fit guide</p>
        <H id="fit-title" className="display mt-3 text-[16vw] md:text-[5.5vw]">One size.<br />Your fit.</H>
        <ol className="mt-8 space-y-5">
          {[
            ["01", "One size", "Every GRIM cap is cut in one size."],
            ["02", "Adjustable strap", "The strap at the back tightens or loosens in seconds."],
            ["03", "Structured front", "The front panels hold their shape. The mesh back gives."],
          ].map(([n, t, d]) => (
            <li key={n} className="grid grid-cols-[40px_1fr] gap-2 border-t border-white/15 pt-4">
              <span className="font-mono text-[13px] text-white/60">{n}</span>
              <div>
                <p className="text-[18px] font-semibold">{t}</p>
                <p className="body-copy mt-1 text-[16px]">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Side-view diagram: strap adjusts the back opening */}
      <figure className="border border-white/10 p-6 md:p-10">
        <svg viewBox="0 0 420 260" className="w-full" fill="none" stroke="#fff" strokeWidth="2" role="img" aria-labelledby="fit-svg-t">
          <title id="fit-svg-t">Side view of a GRIM trucker cap: structured front, mesh back, adjustable strap at the back</title>
          {/* crown */}
          <path d="M70 180 C70 90 140 40 220 40 C300 40 350 100 352 170" />
          {/* front panel seam */}
          <path d="M220 40 C200 80 196 130 200 176" strokeOpacity=".6" />
          {/* mesh hatching on the back */}
          <g strokeOpacity=".35" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, k) => (
              <path key={k} d={`M${236 + k * 13} ${46 + k * 6} L${232 + k * 13} ${176}`} />
            ))}
          </g>
          {/* brim */}
          <path d="M70 180 C40 186 16 196 10 206 C30 214 80 206 120 194" />
          {/* band */}
          <path d="M70 180 C150 170 260 168 352 172" />
          {/* strap gap + strap */}
          <path d="M318 172 C326 196 344 208 360 204" strokeWidth="3" />
          <g fill="#fff" stroke="none">
            {[0, 1, 2, 3, 4].map((k) => (
              <circle key={k} cx={326 + k * 7} cy={190 + k * 3} r="1.6" />
            ))}
          </g>
          {/* arrows */}
          <g stroke="#fff" strokeWidth="1.5">
            <path d="M372 196 l24 6 M390 196 l6 6 -8 3" />
            <path d="M372 214 l-12 22 M360 236 l-1 -9 M360 236 l8 -4" strokeOpacity=".6" />
          </g>
          <text x="244" y="30" fill="#fff" stroke="none" fontFamily="var(--font-mono)" fontSize="12">MESH BACK</text>
          <text x="96" y="122" fill="#fff" stroke="none" fontFamily="var(--font-mono)" fontSize="12">3D LOGO</text>
          <text x="300" y="250" fill="#fff" stroke="none" fontFamily="var(--font-mono)" fontSize="12">ADJUSTABLE STRAP</text>
        </svg>
        <figcaption className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-white/70">Tighten at the back. Done.</figcaption>
      </figure>
    </section>
  );
}
