import Image from "next/image";

const VALUES = [
  {
    n: "01",
    word: "Ownership",
    line: "Own your dark side.",
    body: "Everyone has one. Most people hide it. You put it on your head.",
    img: "/assets/snake-skin-grey-black-cap-covered-face.webp",
    alt: "Model hiding her face under a grey snakeskin GRIM cap, a snake along the brim",
  },
  {
    n: "02",
    word: "Rebellion",
    line: "Rules belong to someone else.",
    body: "No permission asked. No apology after.",
    img: "/assets/snake-skin-green-black-cap-worn-front.webp",
    alt: "Arm raised across the face, toxic green snakeskin GRIM cap and a green snake",
  },
  {
    n: "03",
    word: "Uniqueness",
    line: "Not a cap. A statement.",
    body: "Made to be noticed. Built to be yours.",
    img: "/assets/snake-skin-grey-black-cap-back-view.webp",
    alt: "Back view of a grey snakeskin GRIM cap, embroidered logo facing the camera, python on the shoulders",
  },
];

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="relative">
      <div className="gutter mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center py-24">
        <p className="eyebrow reveal">grim · /ɡrɪm/ · adj.</p>
        <h2 id="manifesto-title" className="display reveal mt-6 text-[13vw] md:text-[9vw]" data-delay="1">
          Dark.
          <br />
          Unsettling.
          <br />
          <span className="text-white/45">Uncomfortable.</span>
        </h2>
        <p className="body-copy reveal mt-10 max-w-[560px] text-[20px] md:text-[24px]" data-delay="2">
          Wearing GRIM means owning your darker side. And putting it on display. Right on your head.
        </p>
      </div>

      {VALUES.map((v, i) => (
        <article key={v.n} className="relative min-h-[100svh] overflow-hidden" aria-labelledby={`value-${v.n}`}>
          <div className={`absolute inset-0 md:inset-y-0 md:w-1/2 ${i % 2 ? "md:left-0" : "md:left-1/2"}`}>
            <Image src={v.img} alt={v.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[50%_15%] opacity-50 md:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60 md:hidden" />
          </div>
          <div className={`gutter relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end pb-20 md:justify-center md:pb-0 ${i % 2 ? "md:items-end md:text-right" : ""}`}>
            <div className="md:w-1/2 md:px-4">
              <p className="eyebrow reveal">{v.n} / 03</p>
              <h3 id={`value-${v.n}`} className="display reveal mt-4 text-[19vw] md:text-[8vw]" data-delay="1">{v.word}</h3>
              <p className="reveal mt-6 text-[26px] font-semibold leading-tight md:text-[34px]" data-delay="2">{v.line}</p>
              <p className="body-copy reveal mt-3 md:text-[19px]" data-delay="3">{v.body}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
