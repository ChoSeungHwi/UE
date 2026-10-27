import { DISCORD_URL, KEYS, MASCOTS, QWILIGHT_URL, downloads, tables, type Mode, type ReleaseFile, type Versions } from "./content";
import versionsJson from "./versions.json";

// 빌드 때 scripts/fetch-versions.ts 가 미러 저장소에서 읽어 온 최신 버전
const versions: Versions = versionsJson;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Lanes({ mode }: { mode: Mode }) {
  return (
    <span className="lanes" aria-hidden="true">
      {Array.from({ length: KEYS[mode] }, (_, i) => <i key={i} />)}
    </span>
  );
}

const formatSize = (bytes: number) => `${(bytes / 1024 ** 3).toFixed(1)} GB`;

// 미러 저장소의 zip 파일로 바로 연결되는 다운로드 버튼. 빌드 때 파일을 못 찾았으면 표시하지 않음
function FileButton({ file, label, mode, primary }: { file?: ReleaseFile; label: string; mode: string; primary?: boolean }) {
  if (!file) return null;
  return (
    <a href={file.url} className={`btn file${primary ? " primary" : " outline"}`}>
      <span>{label} <span className="sr-only">({mode})</span></span>
      <span className="file-meta">v{file.version} · {formatSize(file.size)}</span>
    </a>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#top" className="brand">U<span>_</span>E</a>
          <nav aria-label="주요 메뉴">
            <a href="#tables">난이도표</a>
            <a href="#download">다운로드</a>
            <a href="#discord" className="nav-cta">Discord</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="dot" /> Qwilight 전용 · BMS 최초</p>
            <h1>
              <span className="wordmark">U_E</span>
              <span className="title">4키 · 6키 · 8키<br />BMS 난이도표</span>
              <span className="sr-only"> 유이팩</span>
            </h1>
            <p className="lead">
              유이팩은 Qwilight 개발자 Dev Taehui와 협업하여 만들어진
              BMS 최초의 4키, 6키, 8키 난이도표입니다.
            </p>
            <div className="cta">
              <a href="#tables" className="btn primary">난이도표 보기</a>
              <a href="#download" className="btn">패키지 다운로드</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="halo" aria-hidden="true">
              <span className="glow" />
              <span className="ring" />
              <span className="ring inner" />
              <span className="floor" />
            </div>
            <img className="mascot back" src={MASCOTS.back} alt="" width={309} height={1000} />
            <img
              className="mascot front"
              src={MASCOTS.front}
              alt="유이팩 마스코트 캐릭터"
              width={482}
              height={1000}
              fetchPriority="high"
            />
          </div>
        </section>

        <aside className="notice">
          <strong>플레이 전 확인</strong>
          <span>
            유이팩은 LR2·beatoraja가 아닌 <a href={QWILIGHT_URL} {...ext}>Qwilight 구동기</a>에서 플레이할 수 있습니다.
          </span>
        </aside>

        <section id="tables" className="block" aria-labelledby="tables-title">
          <div className="block-head">
            <p className="label">01 — Tables</p>
            <h2 id="tables-title">난이도표</h2>
          </div>
          <ul className="grid">
            {tables.map((t) => (
              <li key={t.mode} className={`card m${t.mode}`}>
                <div className="card-top">
                  <Lanes mode={t.mode} />
                  <Arrow />
                </div>
                <h3 className="mode">
                  <a href={t.url} {...ext} className="stretched">
                    {t.label}<span className="sr-only"> 난이도표</span>
                  </a>
                </h3>
                <p className="criteria-label">난이도 책정기준</p>
                <ul className="tags">
                  {t.criteria.map((c) => <li key={c}>{c}</li>)}
                </ul>
                {t.extra && (
                  <a href={t.extra.url} {...ext} className="sub-link">{t.extra.label} 열기</a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="download" className="block" aria-labelledby="download-title">
          <div className="block-head">
            <p className="label">02 — Download</p>
            <h2 id="download-title">다운로드</h2>
          </div>

          <a href={QWILIGHT_URL} {...ext} className="step">
            <span className="step-num">STEP 1</span>
            <span className="step-body">
              <strong>Steam에서 Qwilight 설치</strong>
              <span>유이팩을 플레이하려면 먼저 Qwilight 구동기가 필요합니다.</span>
            </span>
            <Arrow />
          </a>

          <p className="step-num step-2">STEP 2 · 패키지 받기</p>
          <ul className="grid">
            {downloads.map((d) => (
              <li key={d.mode} className={`card m${d.mode}`}>
                <div className="card-top">
                  <h3 className="mode">{d.label}</h3>
                  {versions[d.mode] && <span className="badge">v{versions[d.mode]!.version}</span>}
                </div>
                <div className="buttons">
                  <FileButton file={versions[d.mode]?.fullPack} label="Full Pack" mode={d.label} primary />
                  <FileButton file={versions[d.mode]?.patch} label="Patch" mode={d.label} />
                  <a href={d.mirror} {...ext} className="btn">
                    Mirror<span className="sr-only"> ({d.label} 전체 파일 목록)</span>
                  </a>
                </div>
                {versions[d.mode] && (
                  <p className="patch">
                    Latest {versions[d.mode]!.version} ·{" "}
                    <time dateTime={versions[d.mode]!.updated}>{versions[d.mode]!.updated.replaceAll("-", ".")}</time>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="discord" className="block" aria-labelledby="discord-title">
          <a href={DISCORD_URL} {...ext} className="discord">
            <span>
              <p className="label">03 — Community</p>
              <h2 id="discord-title">디스코드에서 최신 소식을 받아보세요</h2>
              <p>U_E 커뮤니티에서 패치 소식을 받고 함께 이야기해요.</p>
            </span>
            <span className="btn light">Discord 입장 <Arrow /></span>
          </a>
        </section>
      </main>

      <footer>
        <span className="brand">U<span>_</span>E</span>
        <div className="credits">
          <p>그림 !J1BJU2N · 스크린샷 6K U_E official</p>
          <p>개발 <a href="https://github.com/Dev-Taehui" {...ext}>Dev Taehui</a></p>
        </div>
      </footer>
    </>
  );
}
