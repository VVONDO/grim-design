// Builds the whole site into ONE self-contained HTML file (images, CSS and JS inlined),
// for viewing where only a single page can load (e.g. a claude.ai artifact on iPad).
// Usage: node preview/build.mjs <out.html>
import { build } from "esbuild";
import { execSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(process.argv[2] ?? join(root, "preview/dist/grim-preview.html"));

// 1. Inline images as data URIs.
const assetsDir = join(root, "public/assets");
const map = {};
for (const f of readdirSync(assetsDir).filter((f) => f.endsWith(".webp"))) {
  map[f] = `data:image/webp;base64,${readFileSync(join(assetsDir, f)).toString("base64")}`;
}
writeFileSync(join(root, "preview/assets.generated.ts"), `export const ASSETS: Record<string, string> = ${JSON.stringify(map)};\n`);

// 2. Bundle the app with Next.js pieces swapped for plain-browser stand-ins.
const swap = {
  "@/lib/links": join(root, "preview/links.ts"),
  "next/image": join(root, "preview/stubs/next-image.tsx"),
  "next/link": join(root, "preview/stubs/next-link.tsx"),
  "next/navigation": join(root, "preview/stubs/next-navigation.ts"),
  "next/dynamic": join(root, "preview/stubs/next-dynamic.tsx"),
  "@/lib/server-assets": join(root, "preview/stubs/server-assets.ts"),
};
const result = await build({
  entryPoints: [join(root, "preview/App.tsx")],
  bundle: true,
  minify: true,
  write: false,
  format: "iife",
  target: "es2020",
  charset: "ascii",
  jsx: "automatic",
  tsconfig: join(root, "tsconfig.json"),
  define: { "process.env.NODE_ENV": '"production"', "process.env.NEXT_PUBLIC_SITE_URL": '"https://grimxo.com"', "process.env.NEXT_PUBLIC_FLAT_LINKS": '"0"' },
  logLevel: "warning",
  plugins: [{
    name: "swap-next",
    setup(b) {
      b.onResolve({ filter: /^(@\/lib\/links|@\/lib\/server-assets|next\/image|next\/link|next\/navigation|next\/dynamic)$/ }, (a) => ({ path: swap[a.path] }));
    },
  }],
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");

// 3. Tailwind CSS from the same config.
const css = execSync(`npx tailwindcss -c tailwind.config.ts -i app/globals.css --minify`, { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString();

// 4. One file. The artifact host adds <html>/<head>/<body>, so none here.
const fonts = "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Big+Shoulders:opsz,wght@10..72,800..900&family=IBM+Plex+Mono:wght@400;500&display=swap";
const html = `<title>GRIM Prototype</title>
<meta name="theme-color" content="#0A0A0A">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fonts}">
<style>
:root{--font-display:"Big Shoulders",Impact,"Arial Narrow",sans-serif;--font-body:"Archivo",system-ui,-apple-system,sans-serif;--font-mono:"IBM Plex Mono",ui-monospace,Menlo,monospace}
${css}
</style>
<div id="grim-root"></div>
<script>${js}</script>
`;
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1048576).toFixed(2)} MB)`);
