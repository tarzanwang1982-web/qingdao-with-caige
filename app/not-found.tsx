import Link from "next/link";

export default function NotFound() { return <main className="not-found"><span>404 · 潮汐之外</span><h1>这条路暂时<br/>没有被收录</h1><p>也许链接已经变化，回到首页重新挑一条才哥推荐路线吧。</p><Link className="button primary" href="/">回到青岛首页</Link></main>; }
