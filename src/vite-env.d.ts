/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 배포 주소 (끝에 / 없이). canonical, OG, sitemap, robots.txt 에 사용 */
  readonly VITE_SITE_URL: string;
}
