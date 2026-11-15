// Stand-in for next/image in the single-file preview: a plain <img>.
import type { CSSProperties } from "react";
type Props = { src: string; alt: string; fill?: boolean; width?: number; height?: number; sizes?: string; priority?: boolean; fetchPriority?: string; loading?: "lazy" | "eager"; className?: string; style?: CSSProperties; "aria-hidden"?: boolean };
export default function Image({ src, alt, fill, width, height, priority, loading, className, style, ...rest }: Props) {
  const s: CSSProperties = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : { ...style };
  return <img src={src} alt={alt} width={fill ? undefined : width} height={fill ? undefined : height} loading={priority ? "eager" : loading ?? "lazy"} decoding="async" className={className} style={s} aria-hidden={rest["aria-hidden"]} />;
}
