import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Story } from "@/components/home/Story";
import { Collections } from "@/components/home/Collections";
import { Numbers } from "@/components/home/Numbers";
import { Community } from "@/components/home/Community";
import { FitGuide } from "@/components/FitGuide";
import { ShippingInfo } from "@/components/ShippingInfo";
import { Enhanced } from "@/components/Enhanced";
import { HomeStage } from "@/components/home/HomeStage";
import { Hero3D } from "@/components/home/Hero3D";
import { Story3D } from "@/components/home/Story3D";
import { artistPhotos, capModelUrl } from "@/lib/server-assets";

export const metadata: Metadata = {
  title: { absolute: "GRIM: Streetwear Caps Worn by Rappers | wear your shadow" },
  description:
    "Romanian streetwear brand GRIM makes snakeskin trucker caps and trap caps worn by rappers. 3D embroidery, mesh back, one size. Delivered in 1–2 business days.",
  alternates: { canonical: "/" },
  openGraph: { title: "GRIM: wear your shadow", description: "Snakeskin trucker caps worn by rappers. A Romanian streetwear brand." },
};

export default function Home() {
  return (
    <>
      {/* Desktop with motion: 3D hero + story on one shared canvas. Phones / reduced motion: the static versions. */}
      <Enhanced
        fallback={
          <>
            <Hero />
            <Manifesto />
            <Story />
          </>
        }
      >
        <HomeStage modelUrl={capModelUrl()} artists={artistPhotos()}>
          <Hero3D />
          <Manifesto />
          <Story3D />
        </HomeStage>
      </Enhanced>
      <Collections />
      <Numbers />
      <section className="gutter mx-auto max-w-[1600px] py-20 md:py-32" aria-label="Fit and delivery">
        <FitGuide />
        <div className="mt-16 grid gap-6 border-t border-white/15 pt-10 md:grid-cols-2">
          <p className="display text-[12vw] md:text-[4.5vw]">At your door in 1–2 days.</p>
          <ShippingInfo />
        </div>
      </section>
      <Community />
    </>
  );
}
