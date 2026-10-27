import type { ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { asset } from "../content";

const SITE_URL = import.meta.env.VITE_SITE_URL.replace(/\/$/, "");
const TITLE = "U_E 유이팩 | BMS 최초 4키·6키·8키 난이도표";
const DESCRIPTION =
  "유이팩(U_E)은 Qwilight 개발자 Dev Taehui와 협업해 만든 BMS 최초의 4키·6키·8키 난이도표입니다. 난이도표, 4K·6K·8K 패키지 다운로드, 디스코드 커뮤니티 안내.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "유이팩, U_E, UE, BMS, 난이도표, 4키, 6키, 8키, 4K, 6K, 8K, Qwilight, 퀼라이트" },
      { name: "theme-color", content: "#0a0a12" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "U_E" },
      { property: "og:locale", content: "ko_KR" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: "Qwilight 전용 BMS 4키·6키·8키 난이도표와 패키지 다운로드." },
      { property: "og:image", content: `${SITE_URL}/og.png` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "icon", href: asset("favicon.svg"), type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "U_E 유이팩",
          alternateName: ["U_E", "UE", "유이팩"],
          url: `${SITE_URL}/`,
          inLanguage: "ko-KR",
          description: "Qwilight 전용 BMS 최초의 4키·6키·8키 난이도표",
        }),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <main className="block">
      <h2>페이지를 찾을 수 없습니다</h2>
      <p><a href={import.meta.env.BASE_URL}>홈으로 돌아가기</a></p>
    </main>
  ),
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
