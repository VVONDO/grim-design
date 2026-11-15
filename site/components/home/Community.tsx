import Image from "next/image";
import { SITE } from "@/lib/site";
import { TEASERS } from "@/lib/products";
import { EmailForm } from "../EmailForm";
import { Insta } from "../Icons";

// [TO FILL] Instagram placeholder: swap for a real feed (or curated posts with permission).
const GRID = [
  ["snake-skin-three-caps-stacked", "Three snakeskin GRIM caps stacked on one head: natural, green, red"],
  ["snake-skin-green-and-pink-caps-duo-wide", "Green and pink snakeskin GRIM caps, back to back"],
  ["snake-skin-blue-and-red-caps-duo", "Blue and red snakeskin GRIM caps on two models"],
  ["snake-skin-grey-black-cap-over-shoulder", "Grey snakeskin GRIM cap, snake curling over the brim"],
  ["snake-skin-natural-black-cap-python", "Natural snakeskin GRIM cap, python in hand"],
  ["snake-skin-grey-black-cap-profile-snake", "Profile in a grey snakeskin GRIM cap, snake arching over the crown"],
];

export function Community() {
  return (
    <section aria-labelledby="community-title" className="py-28 md:py-40">
      <div className="gutter mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow reveal">Community</p>
            <h2 id="community-title" className="display reveal mt-4 text-[17vw] md:text-[8vw]" data-delay="1">{SITE.instagramHandle}</h2>
          </div>
          <a href={SITE.instagram} rel="noopener" className="btn-ghost reveal self-start md:self-auto" data-delay="2">
            <Insta size={18} /> Follow on Instagram
          </a>
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-1 md:gap-2">
          {GRID.map(([f, alt]) => (
            <li key={f} className="relative aspect-square overflow-hidden bg-white/5">
              <a href={SITE.instagram} rel="noopener" aria-label={`${alt}, on Instagram`} className="group block h-full">
                <Image src={`/assets/${f}.webp`} alt={alt} fill sizes="(min-width: 768px) 33vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">Instagram feed placeholder · prototype</p>
      </div>

      <div className="gutter mx-auto mt-28 max-w-[1600px] md:mt-40">
        <div className="grid gap-8 border-t border-white/15 pt-14 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow">Drops</p>
            <h2 className="display mt-4 text-[15vw] md:text-[6vw]">Drops land quiet.</h2>
            <p className="body-copy mt-4 max-w-[460px]">Get one email when something new lands. No spam. Leave anytime.</p>
          </div>
          <EmailForm cta="Get drop alerts" primary={false} />
        </div>
      </div>

      <div className="gutter mx-auto mt-28 max-w-[1600px] md:mt-40" aria-labelledby="more-title">
        <p className="eyebrow">More from GRIM</p>
        <h2 id="more-title" className="display mt-4 text-[12vw] md:text-[5vw]">Not just caps.</h2>
        <div className="mt-8 grid gap-2 md:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden md:row-span-2 md:aspect-auto">
            <Image src="/assets/og-lot-triple-black-cap-full-look.webp" alt="Full GRIM look: washed black hoodie and shorts with a triple black cap" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
          </div>
          <ul className="grid grid-cols-2 gap-2">
            {TEASERS.map((t) => (
              <li key={t.name} className="flex aspect-square flex-col justify-between border border-white/10 p-4 md:p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">Coming to the site</span>
                <span className="display text-[9vw] md:text-[3vw]">{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
