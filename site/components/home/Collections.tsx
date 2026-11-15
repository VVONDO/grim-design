import { byCollection, COLLECTIONS } from "@/lib/products";
import { fmtRON } from "@/lib/site";
import { ColorStage } from "./ColorStage";
import { DetailZoom } from "./DetailZoom";

export function Collections() {
  const snake = COLLECTIONS["snake-skin"];
  const og = COLLECTIONS.og;
  return (
    <>
      <section id="snake-skin" aria-labelledby="snake-title" className="scroll-mt-16">
        <div className="gutter mx-auto flex min-h-[90svh] max-w-[1600px] flex-col justify-center py-24">
          <p className="eyebrow reveal">Collection · {fmtRON(snake.price)}</p>
          <h2 id="snake-title" className="display reveal mt-4 text-[24vw] md:text-[15vw]" data-delay="1">Snake skin</h2>
          <p className="reveal mt-6 max-w-[760px] text-[24px] font-semibold italic leading-tight md:text-[36px]" data-delay="2">“{snake.hook}”</p>
          <p className="body-copy reveal mt-4 max-w-[560px]" data-delay="3">{snake.copy}</p>
        </div>
        <ColorStage products={byCollection("snake-skin")} scrollDriven label="SNAKE SKIN" />
      </section>

      <DetailZoom />

      <section id="og" aria-labelledby="og-title" className="scroll-mt-16 pb-16">
        <div className="gutter mx-auto max-w-[1600px] pb-4 pt-24">
          <p className="eyebrow reveal">Collection · {fmtRON(og.price)}</p>
          <h2 id="og-title" className="display reveal mt-4 text-[24vw] md:text-[15vw]" data-delay="1">OG</h2>
          <p className="body-copy reveal mt-4 max-w-[560px] text-[20px]" data-delay="2">{og.hook} {og.copy}</p>
        </div>
        <ColorStage products={byCollection("og")} label="OG" />
      </section>
    </>
  );
}
