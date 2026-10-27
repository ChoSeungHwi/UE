# U_E 유이팩

Qwilight 전용 BMS 최초의 4키·6키·8키 난이도표 **U_E(유이팩)** 공식 사이트입니다.

- 사이트: https://choseunghwi.github.io/UE/
- 디스코드: https://discord.gg/WuRjRubyPQ

## 기술 스택

- [TanStack Start](https://tanstack.com/start) (React 19, Vite 8). 빌드할 때 모든 페이지를 정적 HTML로 미리 렌더링합니다.
- [Bun](https://bun.sh) 1.4. 패키지 설치와 스크립트 실행에 씁니다.
- GitHub Actions로 GitHub Pages에 배포합니다.

## 시작하기

```bash
bun install
bun run dev        # 개발 서버 (http://localhost:3000)
bun run build      # 정적 빌드 → dist/client
bun run versions   # 미러 저장소의 최신 버전만 다시 확인
```

## 폴더 구조

```
src/
  routes/__root.tsx   메타 태그·OG·구조화 데이터(JSON-LD)·폰트 등 <head> 설정
  routes/index.tsx    메인 페이지 라우트
  App.tsx             메인 페이지 화면
  content.ts          링크·문구·난이도표·미러 주소 (내용 수정은 대부분 여기서)
  styles.css          전체 스타일
  versions.json       빌드 때 자동 생성되는 최신 버전 정보 (직접 수정하지 않음)
scripts/
  fetch-versions.ts   미러 저장소에서 최신 FULL PACK·패치 zip을 찾아 versions.json 생성
  robots.ts           robots.txt 생성
public/               그대로 배포되는 파일 (파비콘, 마스코트 WebP)
art/                  마스코트 원본 PNG (배포되지 않음)
```

## 내용 수정하기

| 바꾸고 싶은 것 | 수정할 곳 |
|---|---|
| 난이도표 링크, 책정 기준 | `src/content.ts`의 `tables` |
| 패키지 미러 주소 | `src/content.ts`의 `downloads` |
| Qwilight(Steam), 디스코드 링크 | `src/content.ts`의 `QWILIGHT_URL`, `DISCORD_URL` |
| 페이지 제목, 설명, 검색 키워드 | `src/routes/__root.tsx` |
| 화면 구성, 문구 | `src/App.tsx` |

### 패치 버전과 다운로드 링크는 자동입니다

빌드할 때 `scripts/fetch-versions.ts`가 각 미러 저장소(`repository.browser.dotoritos.net/4k/` 등)의 파일 목록을 읽습니다.

- 파일 이름에 `FULL PACK`이 들어간 zip은 Full Pack 버튼, 나머지 zip은 Patch 버튼에 연결됩니다.
- 각각 버전 숫자가 가장 높은 파일을 고르고, 버전과 용량을 함께 표시합니다.
- 미러에 새 파일을 올리면 다음 빌드부터 반영되므로 사이트 코드를 고칠 필요가 없습니다.
- 미러가 응답하지 않으면 마지막으로 확인한 값을 그대로 씁니다.

미러 서버가 다른 사이트에서 읽는 것(CORS)을 허용하지 않아서, 브라우저가 아니라 빌드할 때 가져옵니다.

### 마스코트 이미지 바꾸기

원본 PNG를 `art/`에 넣고 웹용 WebP로 변환해 `public/`에 둡니다.

```bash
ffmpeg -i art/2.png -vf "scale=-1:1000" -c:v libwebp -quality 85 public/mascot-2.webp
```

이미지 주변의 투명 여백은 미리 잘라내는 게 좋습니다. 그래야 화면에서 캐릭터가 크게 보입니다. 파일 이름이나 크기가 바뀌면 `src/content.ts`의 `MASCOTS`와 `src/App.tsx`의 `width`/`height`도 함께 맞춰 주세요.

## 배포

`.github/workflows/deploy.yml`이 다음 경우에 빌드해서 GitHub Pages에 배포합니다.

- `main` 브랜치에 푸시했을 때
- 매일 03:00 (KST). 미러의 새 패치를 반영하기 위해서입니다.
- Actions 탭에서 수동으로 실행했을 때

### 사이트 주소와 하위 경로

배포 주소와 하위 경로(`/UE/`)는 워크플로가 Pages 설정에서 자동으로 읽어 빌드에 넘깁니다.

- `VITE_SITE_URL`: canonical, OG, sitemap, robots.txt에 쓰입니다.
- `BASE_PATH`: 사이트가 서빙되는 경로입니다.

커스텀 도메인을 연결해도 코드를 고칠 필요가 없습니다. 로컬 빌드는 `.env`의 기본값을 씁니다.

## 검색 노출 (SEO)

- 모든 내용이 미리 렌더링된 HTML에 들어 있어서, 검색엔진이 JavaScript 없이도 읽을 수 있습니다.
- `sitemap.xml`은 빌드 때 자동으로 생성됩니다.
- `https://<user>.github.io/UE/`처럼 하위 경로 사이트는 검색엔진이 `/UE/robots.txt`를 읽지 않습니다. 그래서 [Google Search Console](https://search.google.com/search-console)에 사이트를 등록하고 사이트맵을 직접 제출해 주세요.

## 크레딧

- 개발: [Dev Taehui](https://github.com/Dev-Taehui)
- 그림: !J1BJU2N
