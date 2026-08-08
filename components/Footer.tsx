import Link from "next/link";

export function Footer() {
  return <footer className="footer"><div><span className="footer-mark">青</span><div><strong>跟着才哥游青岛</strong><p>像本地人一样，走懂青岛。</p></div></div><nav aria-label="页脚导航"><Link href="/planner">定制行程</Link><Link href="/admin">管理后台</Link><Link href="/privacy">隐私说明</Link><Link href="/terms">使用说明</Link></nav><small>路线、天气与开放信息会变化，出发前请以官方发布为准。</small></footer>;
}
