// 사이트에 나오는 링크·문구는 여기서만 수정하면 됩니다.

// public/ 파일 경로. GitHub Pages처럼 하위 경로(/UE/)에 배포될 때도 맞는 주소가 되도록 base를 붙임
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

// 히어로 마스코트 (art/ 의 원본 PNG를 WebP로 변환한 파일)
export const MASCOTS = { front: asset("mascot-2.webp"), back: asset("mascot-1.webp") };

export const QWILIGHT_URL = "https://store.steampowered.com/app/1910130/Qwilight/";
export const DISCORD_URL = "https://discord.gg/WuRjRubyPQ";

export type Mode = "4k" | "6k" | "8k";

// scripts/fetch-versions.ts 가 빌드 때 생성하는 src/versions.json 의 형태
export interface ReleaseFile {
  url: string;
  version: string;
  size: number;
  updated: string;
}
export interface Release {
  version: string;
  updated: string;
  fullPack?: ReleaseFile;
  patch?: ReleaseFile;
}
export type Versions = Partial<Record<Mode, Release>>;

export const KEYS: Record<Mode, number> = { "4k": 4, "6k": 6, "8k": 8 };

export interface Table {
  mode: Mode;
  label: string;
  url: string;
  criteria: string[];
  extra?: { label: string; url: string };
}

export const tables: Table[] = [
  {
    mode: "4k",
    label: "4K",
    url: "https://classmaterma.github.io/4UE/table.html",
    criteria: ["4UE1~19: Qwilight Hard Gauge", "4UE20~: 97%"],
  },
  {
    mode: "6k",
    label: "6K",
    url: "https://classmaterma.github.io/UE/table.html",
    criteria: ["Qwilight Hard Gauge"],
    extra: {
      label: "스프레드시트",
      url: "https://docs.google.com/spreadsheets/d/1Vjeqo8a6WF4QoscNCot3PszeWCpXIaN2B92kse0BoH0/edit?usp=sharing",
    },
  },
  {
    mode: "8k",
    label: "8K",
    url: "https://classmaterma.github.io/8UE/table.html",
    criteria: ["Qwilight Hard Gauge"],
  },
];

// 다운로드 버튼(Full Pack / Patch)은 빌드 때 이 미러 저장소의 최신 zip으로 자동 연결됩니다.
export interface Download {
  mode: Mode;
  label: string;
  mirror: string;
}

export const downloads: Download[] = [
  { mode: "4k", label: "4K", mirror: "https://repository.browser.dotoritos.net/4k/" },
  { mode: "6k", label: "6K", mirror: "https://repository.browser.dotoritos.net/6k/" },
  { mode: "8k", label: "8K", mirror: "https://repository.browser.dotoritos.net/8k/" },
];
