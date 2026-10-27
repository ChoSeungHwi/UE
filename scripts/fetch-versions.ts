// 빌드 전에 실행: 각 미러 저장소의 파일 목록에서 최신 FULL PACK / 패치 zip을 찾아 src/versions.json 에 저장
// (저장소 서버가 CORS를 허용하지 않아 브라우저에서 직접 읽을 수 없으므로 빌드 시점에 가져옴)
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { downloads, type Release, type ReleaseFile, type Versions } from "../src/content";

const out = resolve(import.meta.dir, "../src/versions.json");

function compare(a: string, b: string) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

const newest = (files: ReleaseFile[]) =>
  files.reduce<ReleaseFile | undefined>((a, f) => (!a || compare(f.version, a.version) > 0 ? f : a), undefined);

async function release(mirror: string): Promise<Release> {
  const res = await fetch(mirror, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${mirror} → HTTP ${res.status}`);
  const html = await res.text();

  // 파일 목록의 각 행: <a href="6K%20U_E%20FULL%20PACK%203.2.zip">6K U_E FULL PACK 3.2.zip</a>
  //   ... <size>44507303238</size> ... <time datetime="2026-08-29 09:39:06 +0000 UTC">
  const rows = html.matchAll(
    /<a href="([^"]+)">([^<]*?(\d+(?:\.\d+)+)\.zip)<\/a>[\s\S]*?<size>(\d+)<\/size>[\s\S]*?datetime="(\d{4}-\d{2}-\d{2})/g,
  );
  const files: (ReleaseFile & { full: boolean })[] = [];
  for (const [, href, name, version, size, updated] of rows) {
    files.push({ url: new URL(href, mirror).href, version, size: Number(size), updated, full: /full\s*pack/i.test(name) });
  }

  const fullPack = newest(files.filter((f) => f.full));
  const patch = newest(files.filter((f) => !f.full));
  const latest = newest([fullPack, patch].filter((f) => f !== undefined));
  if (!latest) throw new Error(`${mirror} 에서 버전이 붙은 .zip 파일을 찾지 못함`);

  const strip = (f?: ReleaseFile) => f && { url: f.url, version: f.version, size: f.size, updated: f.updated };
  return { version: latest.version, updated: latest.updated, fullPack: strip(fullPack), patch: strip(patch) };
}

const previous: Versions = JSON.parse(await readFile(out, "utf8").catch(() => "{}"));
const versions: Versions = {};

for (const d of downloads) {
  try {
    const r = (versions[d.mode] = await release(d.mirror));
    console.log(`${d.label}: ${r.version} (${r.updated}) full=${r.fullPack?.version ?? "-"} patch=${r.patch?.version ?? "-"}`);
  } catch (e) {
    // 미러가 잠깐 죽어도 빌드는 계속되도록 이전 값을 유지
    versions[d.mode] = previous[d.mode];
    console.warn(`${d.label}: 확인 실패, 이전 값 유지 (${previous[d.mode]?.version ?? "없음"}) - ${(e as Error).message}`);
  }
}

await writeFile(out, JSON.stringify(versions, null, 2) + "\n");
