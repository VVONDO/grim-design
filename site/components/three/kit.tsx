"use client";

// Small shared 3D kit: math helpers, texture loading, the photo material, dust.
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const damp = (cur: number, target: number, lambda: number, dt: number) => cur + (target - cur) * (1 - Math.exp(-lambda * dt));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const loader = new THREE.TextureLoader();
const cache = new Map<string, Promise<THREE.Texture>>();
export function loadTex(url: string) {
  let p = cache.get(url);
  if (!p) {
    p = loader.loadAsync(url).then((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      return t;
    });
    cache.set(url, p);
  }
  return p;
}
/** Loads a set of textures without suspending. Returns the last fully loaded set. */
export function useTex(urls: string[]) {
  const key = urls.join("|");
  const [set, setSet] = useState<{ key: string; tex: THREE.Texture[] } | null>(null);
  useEffect(() => {
    let live = true;
    Promise.all(urls.map(loadTex)).then((tex) => live && setSet({ key, tex }));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return set;
}

/**
 * Unlit photo on a plane with: crossfade between two textures, a fake spotlight,
 * soft edges, and per-texture UV framing (xf = centre.xy, scale.zw).
 */
export function makePhotoMaterial(soft = 0) {
  const blank = new THREE.Texture();
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      mapA: { value: blank },
      mapB: { value: blank },
      xfA: { value: new THREE.Vector4(0.5, 0.5, 1, 1) },
      xfB: { value: new THREE.Vector4(0.5, 0.5, 1, 1) },
      mixAB: { value: 0 },
      light: { value: 1 },
      opacity: { value: 1 },
      soft: { value: soft },
      lightUv: { value: new THREE.Vector2(0.5, 0.35) },
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D mapA, mapB; uniform vec4 xfA, xfB; uniform vec2 lightUv;
      uniform float mixAB, light, opacity, soft;
      vec4 samp(sampler2D m, vec4 xf){
        vec2 uv = xf.xy + (vUv - 0.5) * xf.zw;
        vec4 c = texture2D(m, vec2(uv.x, 1.0 - uv.y));
        vec2 e = smoothstep(vec2(0.0), vec2(soft + 0.002), uv) * smoothstep(vec2(0.0), vec2(soft + 0.002), 1.0 - uv);
        c.a *= e.x * e.y;
        return c;
      }
      void main(){
        vec4 c = mix(samp(mapA, xfA), samp(mapB, xfB), mixAB);
        float spot = mix(0.32, 1.0, smoothstep(0.95, 0.12, distance(vUv, vec2(lightUv.x, 1.0 - lightUv.y))));
        gl_FragColor = vec4(c.rgb * light * spot, c.a * opacity);
        #include <colorspace_fragment>
      }`,
  });
}
// The shader flips v itself (so framing maths is top-left based): load textures unflipped.
export const noFlip = (t: THREE.Texture) => {
  if (t.flipY) {
    t.flipY = false;
    t.needsUpdate = true;
  }
  return t;
};

export function radialTex(stops: [number, string][], size = 256) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => grad.addColorStop(o, col));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const cssFont = (v: string, fallback: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fallback;
const displayFont = (px: number) => `900 ${px}px ${cssFont("--font-display", "Impact, sans-serif")}`;
const monoFont = (px: number) => `500 ${px}px ${cssFont("--font-mono", "monospace")}`;

/** Giant white word, drawn with the site's display font, as a texture. */
export async function typeTex(text: string, w = 2048, h = 720) {
  try {
    await document.fonts.load(displayFont(200), text);
  } catch {}
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "alphabetic";
  let px = h * 1.2;
  g.font = displayFont(px);
  px *= Math.min(1, (w * 0.98) / g.measureText(text).width);
  g.font = displayFont(px);
  const m = g.measureText(text);
  g.fillText(text, w / 2, h / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Artist card: a real photo if one is provided, otherwise a typographic placeholder. */
export async function cardTex(name: string, n: number, total: number, photo?: string) {
  try {
    await Promise.all([document.fonts.load(displayFont(80), name), document.fonts.load(monoFont(20), "A")]);
  } catch {}
  const W = 520, H = 680;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  g.fillStyle = "#121212";
  g.fillRect(0, 0, W, H);
  if (photo) {
    try {
      const img = new Image();
      img.src = photo;
      await img.decode();
      const s = Math.max(W / img.width, H / img.height);
      g.drawImage(img, (W - img.width * s) / 2, (H - img.height * s) / 2, img.width * s, img.height * s);
      const sh = g.createLinearGradient(0, H * 0.45, 0, H);
      sh.addColorStop(0, "rgba(10,10,10,0)");
      sh.addColorStop(1, "rgba(10,10,10,0.9)");
      g.fillStyle = sh;
      g.fillRect(0, 0, W, H);
    } catch {}
  } else {
    g.fillStyle = "rgba(255,255,255,0.05)";
    g.font = displayFont(430);
    g.textAlign = "center";
    g.fillText(String(n).padStart(2, "0"), W / 2, H * 0.66);
    g.fillStyle = "rgba(255,255,255,0.45)";
    g.font = monoFont(17);
    g.fillText("PHOTO PENDING", W / 2, H * 0.47);
  }
  g.strokeStyle = "rgba(255,255,255,0.3)";
  g.lineWidth = 2;
  g.strokeRect(1, 1, W - 2, H - 2);
  g.textAlign = "left";
  g.fillStyle = "rgba(255,255,255,0.7)";
  g.font = monoFont(17);
  g.fillText(`${String(n).padStart(2, "0")} / ${total}`, 26, 44);
  g.fillStyle = "#fff";
  let px = 92;
  g.font = displayFont(px);
  const up = name.toUpperCase();
  px *= Math.min(1, (W - 52) / g.measureText(up).width);
  g.font = displayFont(px);
  g.fillText(up, 26, H - 30);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Floating dust in the light. `light` 0..1 scales its brightness. */
export function Dust({ light, count = 220, spread = [11, 6.5, 7] as [number, number, number] }: { light: React.RefObject<number>; count?: number; spread?: [number, number, number] }) {
  const pts = useRef<THREE.Points>(null!);
  const { geo, speed, map } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread[0];
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
      pos[i * 3 + 2] = (Math.random() - 0.6) * spread[2] + 1;
      speed[i] = 0.02 + Math.random() * 0.06;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geo, speed, map: radialTex([[0, "rgba(255,255,255,1)"], [0.4, "rgba(255,255,255,0.35)"], [1, "rgba(255,255,255,0)"]], 64) };
  }, [count, spread]);
  useFrame((st, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const a = geo.attributes.position as THREE.BufferAttribute;
    const arr = a.array as Float32Array;
    const top = spread[1] / 2;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speed[i] * dt;
      arr[i * 3] += Math.sin(st.clock.elapsedTime * 0.3 + i) * 0.0006;
      if (arr[i * 3 + 1] > top) arr[i * 3 + 1] = -top;
    }
    a.needsUpdate = true;
    (pts.current.material as THREE.PointsMaterial).opacity = 0.5 * (light.current ?? 1);
  });
  return (
    <points ref={pts} geometry={geo} frustumCulled={false}>
      <pointsMaterial map={map} size={0.045} sizeAttenuation transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
