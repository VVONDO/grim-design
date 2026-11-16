/** Fly a small copy of the cap from the viewer into the header cart icon. Resolves when it lands. */
export function flyToCart(src: string): Promise<void> {
  const cart = document.querySelector<HTMLElement>("[data-cart-target]");
  const from = document.querySelector<HTMLElement>("[data-fly-origin]");
  if (!cart || !from || !from.offsetParent || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();
  const a = from.getBoundingClientRect();
  const b = cart.getBoundingClientRect();
  const size = Math.min(a.width, a.height) * 0.42;
  const x0 = a.left + a.width / 2 - size / 2, y0 = a.top + a.height * 0.36 - size / 2;
  const dx = b.left + b.width / 2 - (x0 + size / 2), dy = b.top + b.height / 2 - (y0 + size / 2);
  const el = document.createElement("div");
  el.style.cssText = `position:fixed;left:${x0}px;top:${y0}px;width:${size}px;height:${size}px;z-index:60;pointer-events:none;border-radius:50%;background:url("${src}") center/cover;box-shadow:0 20px 60px rgba(0,0,0,.8);will-change:transform,opacity`;
  document.body.appendChild(el);
  const anim = el.animate(
    [
      { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
      { transform: `translate(${dx * 0.45}px,${dy * 0.35 - 90}px) scale(.55) rotate(-25deg)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px,${dy}px) scale(.06) rotate(-70deg)`, opacity: 0.4 },
    ],
    { duration: 750, easing: "cubic-bezier(.5,0,.3,1)" },
  );
  return anim.finished.then(
    () => {
      el.remove();
      cart.animate([{ transform: "scale(1)" }, { transform: "scale(1.35)" }, { transform: "scale(1)" }], { duration: 320, easing: "ease-out" });
    },
    () => el.remove(),
  );
}
