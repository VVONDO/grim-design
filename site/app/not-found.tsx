import Link from "next/link";

export default function NotFound() {
  return (
    <div className="gutter mx-auto flex min-h-[80svh] max-w-[1600px] flex-col justify-center pt-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-[22vw] md:text-[12vw]">Lost in the dark.</h1>
      <Link href="/caps" className="btn-ghost mt-10 self-start">See the caps</Link>
    </div>
  );
}
