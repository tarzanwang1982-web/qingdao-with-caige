"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">跳到主要内容</a>
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="跟着才哥游青岛首页">
          <span className="brand-mark" aria-hidden="true">青</span>
          <span><strong>跟着才哥</strong><small>游青岛</small></span>
        </Link>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
          <span aria-hidden="true">{open ? "×" : "☰"}</span><span className="sr-only">打开导航</span>
        </button>
        <nav id="main-nav" className={open ? "main-nav is-open" : "main-nav"} aria-label="主要导航">
          <Link href="/#routes" onClick={() => setOpen(false)}>才哥路线</Link>
          <Link href="/#seasons" onClick={() => setOpen(false)}>四季青岛</Link>
          <Link href="/planner" onClick={() => setOpen(false)}>定制行程</Link>
          <Link className="nav-primary" href="/planner" onClick={() => setOpen(false)}>开始规划</Link>
        </nav>
      </div>
    </header>
  );
}
