// Stand-in for next/link: a plain anchor (hrefs are #hash routes in the preview).
import type { AnchorHTMLAttributes } from "react";
export default function Link({ href, scroll: _s, prefetch: _p, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; scroll?: boolean; prefetch?: boolean }) {
  return <a href={href} {...rest} />;
}
