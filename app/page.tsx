import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroCanvas } from "../components/HeroCanvas";
import { RouteExplorer } from "../components/RouteExplorer";
import { WeatherPanel } from "../components/WeatherPanel";

const seasons = [
  { name:"春日漫游", text:"花开、老城与崂山。海风仍凉，带一件薄外套。", color:"spring" },
  { name:"夏日看海", text:"把海边放在早晨和傍晚，正午留给博物馆与午餐。", color:"summer" },
  { name:"秋日赏景", text:"八大关与崂山进入好时节，昼夜温差开始明显。", color:"autumn" },
  { name:"冬日逛吃", text:"缩短海边停留，用建筑、场馆和热饭认识青岛。", color:"winter" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero">
          <Image unoptimized className="hero-image" src="/images/hero-qingdao.webp" alt="青岛海岸、红瓦老城与远山的编辑风景图" fill priority sizes="100vw" />
          <div className="hero-scrim" /><HeroCanvas />
          <div className="hero-content">
            <p className="hero-kicker">一位青岛人整理的旅行方案</p>
            <h1>跟着才哥<br />游青岛</h1>
            <p className="hero-lead">像本地人一样，走懂青岛。</p>
            <div className="hero-actions"><a className="button primary" href="#routes">看看推荐路线</a><Link className="button quiet" href="/planner">定制我的行程</Link></div>
          </div>
          <div className="hero-note"><span>36.067° N</span><span>120.383° E</span><p>山、海、老城与烟火，在一条顺路的行程里相遇。</p></div>
          <a className="scroll-cue" href="#weather" aria-label="向下查看"><span />向下</a>
        </section>

        <section className="weather-wrap" id="weather"><div className="weather-intro"><p>出发之前</p><h2>天气会参与规划，<br />不会替你制造焦虑。</h2></div><WeatherPanel /></section>

        <section className="section routes-section" id="routes">
          <div className="section-heading"><div><p>才哥推荐</p><h2>选一条真正走得通的路线</h2></div><p>每条方案都考虑路程、停留时间、体力、季节和临时天气。你可以直接使用，也可以复制后调整。</p></div>
          <RouteExplorer />
        </section>

        <section className="planner-callout">
          <div className="planner-map" aria-hidden="true"><Image unoptimized src="/images/map-oldcity.webp" alt="" fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
          <div className="planner-copy"><span className="stamp">自由组合</span><h2>你选地点，<br />系统帮你把路走顺。</h2><p>输入出发点、日期和时间，从才哥精选地点中勾选想去的地方。系统会整理顺序、比较交通方式，地点太多时自动拆成多日。</p><Link className="button primary" href="/planner">开始定制行程</Link></div>
        </section>

        <section className="section seasons" id="seasons"><div className="section-heading"><div><p>一年四季</p><h2>同一座城，不同的走法</h2></div><p>季节建议只做真正影响体验的调整，不会因为普通阴天或小雨就轻易否定一整天。</p></div><div className="season-list">{seasons.map((season, index) => <article className={`season-item ${season.color}`} key={season.name}><span>{String(index + 1).padStart(2,"0")}</span><h3>{season.name}</h3><p>{season.text}</p><Link href={`/planner?season=${encodeURIComponent(season.name.slice(0,1))}`}>按这个季节规划</Link></article>)}</div></section>

        <section className="caige-note"><div><p>才哥的青岛提示</p><blockquote>“好路线不一定塞满景点，而是让每一站都在合适的时间出现。”</blockquote></div><ul><li><strong>先看时间</strong><span>预约、闭馆和日落会改变顺序。</span></li><li><strong>再看体力</strong><span>青岛老城有坡，海边也会比地图看起来更长。</span></li><li><strong>最后看天气</strong><span>普通天气只调整体验，极端天气才建议改期。</span></li></ul></section>
      </main>
      <Footer />
    </>
  );
}
