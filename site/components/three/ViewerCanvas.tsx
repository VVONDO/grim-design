"use client";

// Product page viewer: the product photos on a plane in a lit, dusty scene.
// Drag = turntable (yaw + crossfade between angle shots). `ctl.focus` zooms into a hotspot.
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Hotspot } from "@/lib/experience";
import { CapModel } from "./CapModel";
import { Dust, damp, lerp, makePhotoMaterial, noFlip, radialTex, smooth, useTex } from "./kit";

export type ViewerCtl = {
  angle: number; // turntable position in "shots" (float)
  dragging: boolean;
  focus: number; // 0 = free view, 1..3 = hotspot
  px: number; // pointer over the viewer, -1..1
  py: number;
  pulse: number; // set to 1 on add-to-cart
};
export type Shot = { src: string; w: number; h: number };

const W = 2.7, H = W * 1.25; // 4:5 plane
const DETAIL = 1; // index of the close-up shot

function Scene({ shots, hotspots, ctl, onFocus, modelUrl }: { shots: Shot[]; hotspots: Hotspot[]; ctl: React.RefObject<ViewerCtl>; onFocus: (k: number) => void; modelUrl?: string }) {
  const set = useTex(shots.map((s) => s.src));
  const mat = useMemo(() => makePhotoMaterial(0.16), []);
  const glow = useMemo(() => radialTex([[0, "rgba(255,255,255,1)"], [0.5, "rgba(255,255,255,0.25)"], [1, "rgba(255,255,255,0)"]]), []);
  const plane = useRef<THREE.Group>(null!);
  const backM = useRef<THREE.MeshBasicMaterial>(null!);
  const light = useRef(0);
  const [pins, setPins] = useState(false);
  const target = useMemo(() => new THREE.Vector3(), []);

  // Currently displayed set, the set it replaced, and the swap animation between them.
  const cur = useRef<{ key: string; tex: THREE.Texture[]; shots: Shot[] } | null>(null);
  const old = useRef<{ tex: THREE.Texture; shot: Shot } | null>(null);
  const v = useRef({ t: 0, swap: 0, zoom: 0, tx: 0, ty: 0, cx: 0, cy: 0, pinsOn: false });

  useEffect(() => {
    if (!set || set.key !== shots.map((x) => x.src).join("|")) return;
    set.tex.forEach(noFlip);
    if (cur.current && cur.current.key !== set.key) {
      const n = cur.current.tex.length;
      const i = ((Math.round(ctl.current!.angle) % n) + n) % n;
      old.current = { tex: cur.current.tex[i], shot: cur.current.shots[i] };
      v.current.swap = 1;
      ctl.current!.angle = ((i % shots.length) + shots.length) % shots.length;
    }
    cur.current = { key: set.key, tex: set.tex, shots };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set]);

  // Fit a texture of any aspect inside the 4:5 plane.
  const frame = (out: THREE.Vector4, s: Shot) => {
    const a = s.w / s.h, pa = W / H;
    return a > pa ? out.set(0.5, 0.5, 1, a / pa) : out.set(0.5, 0.5, pa / a, 1);
  };

  useFrame((st, dtRaw) => {
    const c = cur.current;
    const k = ctl.current!;
    if (!c) return;
    const dt = Math.min(dtRaw, 0.05);
    const s = v.current;
    const n = c.tex.length;
    const time = st.clock.elapsedTime;
    s.t += dt;
    light.current = smooth(0.1, 1.4, s.t);

    // Turntable: snap to the nearest shot when released; a hotspot forces the close-up.
    if (!k.dragging) {
      let goal = Math.round(k.angle);
      if (k.focus > 0 && n > DETAIL) goal = Math.round((k.angle - DETAIL) / n) * n + DETAIL;
      k.angle = damp(k.angle, goal, 6, dt);
    }
    const i = Math.floor(k.angle + 0.5);
    const f = k.angle - i;
    const idx = ((i % n) + n) % n;
    const nb = (((f >= 0 ? i + 1 : i - 1) % n) + n) % n;
    const u = mat.uniforms;
    s.swap = damp(s.swap, 0, 4.5, dt);
    if (s.swap > 0.01 && old.current) {
      // Colour swap: dissolve from the previous colourway's shot.
      u.mapA.value = c.tex[idx];
      frame(u.xfA.value, c.shots[idx]);
      u.mapB.value = old.current.tex;
      frame(u.xfB.value, old.current.shot);
      u.mixAB.value = smooth(0.15, 0.85, s.swap);
    } else {
      u.mapA.value = c.tex[idx];
      frame(u.xfA.value, c.shots[idx]);
      u.mapB.value = c.tex[nb];
      frame(u.xfB.value, c.shots[nb]);
      u.mixAB.value = n > 1 ? smooth(0.28, 0.5, Math.abs(f)) * 0.5 : 0;
    }
    u.light.value = light.current;
    u.lightUv.value.set(0.5 + k.px * 0.15, 0.3 - k.py * 0.12);

    // Zoom into the active hotspot (positions are on the square close-up, centred on the plane).
    const hs = k.focus > 0 ? hotspots[k.focus - 1] : undefined;
    s.zoom = damp(s.zoom, hs ? 1 : 0, 4, dt);
    if (hs) {
      s.tx = damp(s.tx, (hs.at[0] - 0.5) * W, 5, dt);
      s.ty = damp(s.ty, (0.5 - hs.at[1]) * W, 5, dt);
    }
    const z = s.zoom;

    const g = plane.current;
    const swing = Math.sin(s.swap * Math.PI);
    k.pulse = damp(k.pulse, 0, 5, dt);
    const free = 1 - z;
    g.rotation.y = Math.sin(2 * Math.PI * f) * 0.34 + (Math.sin(time * 0.5) * 0.07 + k.px * 0.2) * free + swing * 0.8 + (modelUrl ? k.angle * 1.2 : 0);
    g.rotation.x = (-k.py * 0.12 + Math.sin(time * 0.7) * 0.02) * free;
    g.position.y = Math.sin(time * 0.9) * 0.03 * free;
    g.scale.setScalar((1 - swing * 0.08) * (1 - k.pulse * 0.18));

    s.cx = damp(s.cx, k.px * 0.35 * free, 4, dt);
    s.cy = damp(s.cy, k.py * 0.2 * free, 4, dt);
    st.camera.position.set(lerp(s.cx, s.tx, z), lerp(s.cy, s.ty, z), lerp(6, 2.7, z));
    target.set(s.tx * z, s.ty * z, 0);
    st.camera.lookAt(target);
    backM.current.opacity = light.current * 0.05;

    const showPins = idx === DETAIL && Math.abs(f) < 0.12 && s.swap < 0.05;
    if (showPins !== s.pinsOn) {
      s.pinsOn = showPins;
      setPins(showPins);
    }
  });

  return (
    <>
      <mesh position={[0, 0.4, -4]}>
        <planeGeometry args={[13, 9]} />
        <meshBasicMaterial ref={backM} map={glow} transparent opacity={0} depthWrite={false} />
      </mesh>
      <group ref={plane}>
        {modelUrl ? (
          <Suspense fallback={null}>
            <CapModel url={modelUrl} size={2.6} />
          </Suspense>
        ) : (
          <mesh material={mat} renderOrder={2}>
            <planeGeometry args={[W, H]} />
          </mesh>
        )}
        {pins &&
          hotspots.map((h, k) => (
            <Html key={h.id} position={[(h.at[0] - 0.5) * W, (0.5 - h.at[1]) * W, 0.02]} center zIndexRange={[5, 0]}>
              <button type="button" onClick={() => onFocus(k + 1)} aria-label={h.title} className="group relative flex h-9 w-9 items-center justify-center">
                <span className="absolute h-7 w-7 animate-ping rounded-full border border-white/60" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white font-mono text-[11px] font-medium text-[#0A0A0A]">{k + 1}</span>
              </button>
            </Html>
          ))}
      </group>
      <Dust light={light} count={150} spread={[7, 6, 6]} />
    </>
  );
}

export default function ViewerCanvas(props: { shots: Shot[]; hotspots: Hotspot[]; ctl: React.RefObject<ViewerCtl>; onFocus: (k: number) => void; modelUrl?: string }) {
  return (
    <Canvas flat dpr={[1, 1.75]} camera={{ fov: 35, position: [0, 0, 6], near: 0.1, far: 40 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <color attach="background" args={["#0A0A0A"]} />
      <fog attach="fog" args={["#0A0A0A", 7, 15]} />
      <Scene {...props} />
    </Canvas>
  );
}
