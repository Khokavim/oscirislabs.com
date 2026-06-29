import { access, cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const serverAppDir = join(root, ".next", "server", "app");

const pages = [
  ["index.html", "index.html"],
  ["about.html", "about/index.html"],
  ["home.html", "home/index.html"],
  ["mvp.html", "mvp/index.html"],
  ["resources.html", "resources/index.html"],
  ["whitepaper.html", "whitepaper/index.html"],
  ["_not-found.html", "404.html"],
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await cp(join(root, "public"), outDir, { recursive: true });
await mkdir(join(outDir, "_next"), { recursive: true });
await cp(join(root, ".next", "static"), join(outDir, "_next", "static"), {
  recursive: true,
});

for (const [source, target] of pages) {
  const sourcePath = join(serverAppDir, source);

  try {
    await access(sourcePath);
  } catch {
    console.warn(`[create-pages-artifact] skipping missing static page: ${source}`);
    continue;
  }

  const targetPath = join(outDir, target);
  await mkdir(join(targetPath, ".."), { recursive: true });
  await cp(sourcePath, targetPath);
}
