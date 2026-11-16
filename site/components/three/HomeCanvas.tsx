"use client";

// The one canvas on the home page. It renders the hero scene or the story scene,
// depending on which pinned section is on screen (see HomeStage).
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { stage } from "@/lib/stage";
import { ARTIST_CARDS, HERO_CAPS } from "@/lib/experience";
import { PROOF } from "@/lib/site";
import { CapModel } from "./CapModel";
import { Dust, cardTex, damp, lerp, makePhotoMaterial, noFlip, radialTex, smooth, typeTex, useTex } from "./kit";

const CAP = 2.7; // cap plane size in world units
const INK = "#0A0A0A";

function useGlow() {
  return useMemo(() => radialTex([[0, "rgba(255,255,255,1)"], [0.5, "rgba(255,255,255,0.25)"], [1, "rgba(255,255,255,0)"]]), []);
}

/* ---------------------------------- HERO ---------------------------------- */

function HeroScene({ modelUrl }: { modelUrl?: string }) {
  const set = useTex(HERO_CAPS.map((c) => c.src));
  const mat = useMemo(() => makePhotoMaterial(0), []);
  const glow = useGlow();
  const shadowTex = useMemo(() => radialTex([[0, "rgba(0,0,0,0.9)"], [0.55, "rgba(0,0,0,0.5)"], [1, "rgba(0,0,0,0)"]]), []);
  const [type, setType] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    typeTex("GRIM").then(setType);
  }, []);
  useEffect(() => {
    set?.tex.forEach(noFlip);
  }, [set]);

  const root = useRef<THREE.Group>(null!);
  const cap = useRef<THREE.Group>(null!);
  const typeM = useRef<THREE.MeshBasicMaterial>(null!);
  const typeMesh = useRef<THREE.Mesh>(null!);
  const backM = useRef<THREE.MeshBasicMaterial>(null!);
  const beamM = useRef<THREE.MeshBasicMaterial>(null!);
  const shadow = useRef<THREE.Mesh>(null!);
  const light = useRef(0);
  const v = useRef({ p: 0, t: 0, cx: 0, cy: 0 });
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((st, dtRaw) => {
    const on = stage.scene === "hero";
    root.current.visible = on;
    if (!on || !set || !type) return;
    const dt = Math.min(dtRaw, 0.05);
    const s = v.current;
    s.t += Math.min(dtRaw, 0.25);
    s.p = damp(s.p, stage.hero, 7, dt);
    const p = s.p;
    const time = st.clock.elapsedTime;

    // Intro: the spotlight comes up on a black stage.
    light.current = smooth(0.3, 2.6, s.t);
    const L = light.current;

    // Scroll phases.
    const approach = smooth(0, 0.28, p);
    const push = smooth(0.26, 0.44, p) * (1 - smooth(0.5, 0.6, p));
    const cyc = Math.min(4.9999, Math.max(0, ((p - 0.52) / 0.38) * 5));
    const i = Math.floor(cyc);
    const mix = p >= 0.9 ? 1 : smooth(0.3, 0.7, cyc - i);
    const u = mat.uniforms;
    u.mapA.value = set.tex[i];
    u.mapB.value = set.tex[Math.min(5, i + 1)];
    u.mixAB.value = mix;
    u.light.value = L;
    u.lightUv.value.set(0.5 + stage.px * 0.12, 0.3 - stage.py * 0.1);

    // Cap: floats, sways, turns toward you, swings on each colour change.
    const swing = Math.sin(mix * Math.PI);
    const g = cap.current;
    g.position.set(0, 0.18 + Math.sin(time * 0.9) * 0.04, approach * 0.9);
    const idle = 1 - push;
    g.rotation.y = (Math.sin(time * 0.45) * 0.16 + Math.sin(approach * Math.PI) * 0.5) * idle + swing * 0.55 + stage.px * 0.22 * idle + (modelUrl ? p * Math.PI * 4 : 0);
    g.rotation.x = -stage.py * 0.14 * idle + Math.sin(time * 0.6) * 0.03 * idle;
    g.rotation.z = Math.sin(time * 0.35) * 0.02;
    g.scale.setScalar(1 - swing * 0.06);

    // Camera: mouse parallax, then push in on the embroidery, then pull back.
    const logo = HERO_CAPS[0].logo;
    const lx = (logo[0] - 0.5) * CAP;
    const ly = (0.5 - logo[1]) * CAP + g.position.y;
    const back = smooth(0.55, 0.9, p) * 0.5;
    s.cx = damp(s.cx, stage.px * 0.45, 4, dt);
    s.cy = damp(s.cy, stage.py * 0.25, 4, dt);
    const par = 1 - push * 0.8;
    st.camera.position.set(lerp(s.cx * par, lx, push), lerp(s.cy * par, ly, push), lerp(6 + back, g.position.z + 2.5, push));
    target.set(lerp(0, lx, push), lerp(0.1, ly, push), 0);
    st.camera.lookAt(target);

    // Back layers: the wall of type, the pool of light, the cap's shadow.
    typeM.current.opacity = L * (0.3 - approach * 0.1) * (1 - push);
    typeMesh.current.scale.setScalar(1 + approach * 0.06);
    backM.current.opacity = L * 0.06;
    beamM.current.opacity = L * 0.05 * (1 - push);
    shadow.current.position.set(0.3 - stage.px * 0.25, -0.2 + stage.py * 0.12, -1.5);
    (shadow.current.material as THREE.MeshBasicMaterial).opacity = L * 0.95;

    stage.onHero?.(p, mix > 0.5 ? Math.min(5, i + 1) : i, L);
  });

  return (
    <group ref={root}>
      <mesh position={[0, 0.6, -5]} renderOrder={0}>
        <planeGeometry args={[16, 10]} />
        <meshBasicMaterial ref={backM} map={glow} transparent opacity={0} depthWrite={false} />
      </mesh>
      {type && (
        <mesh ref={typeMesh} position={[0, 0.42, -2.8]} renderOrder={1}>
          <planeGeometry args={[9.4, 9.4 * (720 / 2048)]} />
          <meshBasicMaterial ref={typeM} map={type} transparent opacity={0} depthWrite={false} />
        </mesh>
      )}
      <mesh ref={shadow} renderOrder={2}>
        <planeGeometry args={[3.6, 2.4]} />
        <meshBasicMaterial map={shadowTex} transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh position={[0, 1.6, -1]} renderOrder={3} scale={[2.6, 5, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={beamM} map={glow} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <group ref={cap} renderOrder={4}>
        {modelUrl ? (
          <Suspense fallback={null}>
            <CapModel url={modelUrl} />
          </Suspense>
        ) : (
          <mesh material={mat} renderOrder={4} visible={!!set}>
            <planeGeometry args={[CAP, CAP]} />
          </mesh>
        )}
      </group>
      <Dust light={light} />
    </group>
  );
}

/* ---------------------------------- STORY --------------------------------- */

const CARD_POS: [number, number, number][] = [
  [1.9, 0.0, 0],
  [3.35, 1.0, -2.4],
  [0.55, -1.05, -1.5],
  [3.1, -1.3, -3.4],
];
const CARD_W = 1.25, CARD_H = (1.25 * 680) / 520;

function bezier(out: THREE.Vector3, a: number[], b: number[], c: number[], t: number) {
  const k = 1 - t;
  return out.set(k * k * a[0] + 2 * k * t * b[0] + t * t * c[0], k * k * a[1] + 2 * k * t * b[1] + t * t * c[1], k * k * a[2] + 2 * k * t * b[2] + t * t * c[2]);
}

function StoryScene({ artists }: { artists: Record<string, string> }) {
  const set = useTex([HERO_CAPS[0].src]);
  const capMat = useMemo(() => makePhotoMaterial(0), []);
  const glow = useGlow();
  const [cards, setCards] = useState<THREE.Texture[] | null>(null);
  useEffect(() => {
    Promise.all(ARTIST_CARDS.map((a, k) => cardTex(a.name, k + 1, PROOF.internationalArtists, artists[a.slug]))).then(setCards);
  }, [artists]);
  useEffect(() => {
    if (set) {
      capMat.uniforms.mapA.value = capMat.uniforms.mapB.value = noFlip(set.tex[0]);
    }
  }, [set, capMat]);

  const root = useRef<THREE.Group>(null!);
  const cardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const cap = useRef<THREE.Mesh>(null!);
  const flash = useRef<THREE.Mesh>(null!);
  const backM = useRef<THREE.MeshBasicMaterial>(null!);
  const light = useRef(0.8);
  const v = useRef({ q: 0, flash: 0, cx: 0, cy: 0 });
  const tmp = useMemo(() => new THREE.Vector3(), []);
  // HDR red: the only thing bright enough to pass the bloom threshold.
  const flashColor = useMemo(() => new THREE.Color(5, 0.28, 0.6), []);

  useFrame((st, dtRaw) => {
    const on = stage.scene === "story";
    root.current.visible = on;
    if (!on) return;
    const dt = Math.min(dtRaw, 0.05);
    const s = v.current;
    const prev = s.q;
    s.q = damp(s.q, stage.story, 7, dt);
    const q = s.q;
    const time = st.clock.elapsedTime;
    const LAND = 0.46;

    s.cx = damp(s.cx, stage.px * 0.5, 4, dt);
    s.cy = damp(s.cy, stage.py * 0.28, 4, dt);
    st.camera.position.set(s.cx, s.cy, 6);
    st.camera.lookAt(0, 0, 0);

    // Cards: the first one is the stage; the rest drift in from the dark after the landing.
    cardRefs.current.forEach((m, k) => {
      if (!m) return;
      const [x, y, z] = CARD_POS[k];
      const a = k === 0 ? smooth(0.2, 0.3, q) : smooth(0.5 + k * 0.03, 0.66 + k * 0.03, q);
      (m.material as THREE.MeshBasicMaterial).opacity = a * (k === 0 ? 1 : 0.9);
      m.position.set(x + Math.sin(time * 0.3 + k * 2) * 0.08, y + Math.cos(time * 0.4 + k) * 0.07, k === 0 ? z : z - (1 - a) * 5);
      m.rotation.y = -0.22 + Math.sin(time * 0.25 + k) * 0.06 + stage.px * 0.1;
      m.rotation.x = stage.py * -0.06;
    });

    // The throw: from the crowd (bottom-left, close) onto the card.
    const t = smooth(0, 1, (q - 0.28) / (LAND - 0.28));
    const c0 = cardRefs.current[0];
    const end = c0 ? [c0.position.x + 0.02, c0.position.y + 0.42, 0.12] : [1.9, 0.42, 0.12];
    bezier(tmp, [-4.6, -2.6, 3.4], [-1.2, 2.6, 2], end, t);
    cap.current.position.copy(tmp);
    cap.current.visible = !!set && q > 0.28;
    cap.current.rotation.z = (1 - t) * (1 - t) * 9;
    cap.current.rotation.x = Math.sin(t * Math.PI) * 0.55;
    cap.current.rotation.y = c0 && t > 0.98 ? c0.rotation.y : 0;
    cap.current.scale.setScalar(lerp(1.5, 0.5, t));

    // Landing: one red flash (time-based, so it never sticks if you stop scrolling there).
    if (prev < LAND && q >= LAND) s.flash = 1;
    s.flash = damp(s.flash, 0, 3.2, dt);
    const fm = flash.current.material as THREE.MeshBasicMaterial;
    fm.opacity = s.flash;
    flash.current.position.set(end[0], end[1] - 0.2, 0.06);
    flash.current.scale.setScalar(2.2 + (1 - s.flash) * 2.5);
    backM.current.opacity = 0.04 + s.flash * 0.1;

    stage.onStory?.(q);
  });

  return (
    <group ref={root} visible={false}>
      <mesh position={[1.5, 0.3, -5]}>
        <planeGeometry args={[16, 10]} />
        <meshBasicMaterial ref={backM} map={glow} transparent opacity={0.04} depthWrite={false} />
      </mesh>
      {cards?.map((tex, k) => (
        <mesh key={k} ref={(m) => void (cardRefs.current[k] = m)} renderOrder={k === 0 ? 5 : 2}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial map={tex} transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
      <mesh ref={flash} renderOrder={6}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={glow} color={flashColor} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <mesh ref={cap} material={capMat} renderOrder={7} visible={false}>
        <planeGeometry args={[1.6, 1.6]} />
      </mesh>
      <Dust light={light} count={160} />
    </group>
  );
}

/* --------------------------------- CANVAS --------------------------------- */

export default function HomeCanvas({ active, modelUrl, artists }: { active: boolean; modelUrl?: string; artists: Record<string, string> }) {
  return (
    <Canvas flat dpr={[1, 1.75]} frameloop={active ? "always" : "never"} camera={{ fov: 35, position: [0, 0, 6], near: 0.1, far: 40 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 7, 16]} />
      <HeroScene modelUrl={modelUrl} />
      <StoryScene artists={artists} />
      {/* Light bloom, and only on the HDR red flash: everything else stays under the threshold. */}
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={1.1} luminanceSmoothing={0.2} intensity={0.9} radius={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
