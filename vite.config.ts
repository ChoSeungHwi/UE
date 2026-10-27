import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // GitHub Pages 프로젝트 페이지(https://<user>.github.io/UE/)는 /UE/ 아래에서 서빙되므로
  // CI에서 BASE_PATH=/UE/ 로 빌드. 커스텀 도메인을 붙이면 "/" 로 바꾸면 됩니다.
  const base = env.BASE_PATH || "/";
  const siteUrl = env.VITE_SITE_URL.replace(/\/$/, "");

  return {
    base,
    plugins: [
      tanstackStart({
        // 모든 페이지를 빌드 때 정적 HTML로 미리 렌더링 (GitHub Pages는 정적 파일만 서빙)
        prerender: { enabled: true, failOnError: true },
        sitemap: { enabled: true, host: siteUrl },
        pages: [{ path: "/", sitemap: { changefreq: "weekly", priority: 1 } }],
      }),
      viteReact(),
    ],
  };
});
