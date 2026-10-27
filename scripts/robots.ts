// vite build 이후 실행: 사이트 주소에 맞춘 robots.txt 를 정적 출력 폴더에 생성
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnv } from "vite";

const root = resolve(import.meta.dir, "..");
const siteUrl = loadEnv("production", root, "").VITE_SITE_URL.replace(/\/$/, "");

await writeFile(resolve(root, "dist/client/robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`robots.txt → ${siteUrl}/sitemap.xml`);
