"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Row = Record<string, unknown>;
const emptyPlace = { id:"", name:"", category:"城市漫游", summary:"", imageUrl:"/images/route-oldcity.webp", latitude:"36.0671", longitude:"120.3826", durationMinutes:"60", difficulty:"轻松", seasons:"全年", weatherSensitivity:"普通", notes:"", status:"published" };
const emptyRoute = { id:"", name:"", subtitle:"", description:"", imageUrl:"/images/route-oldcity.webp", durationLabel:"一日", totalMinutes:"480", walkingKm:"5", intensity:"适中", seasons:"全年", audience:"全家", theme:"经典", placeIds:"", featured:false, status:"published" };

export function AdminClient({ email }: { email: string }) {
  const [tab, setTab] = useState<"places"|"routes">("places");
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Record<string, string|boolean>>(emptyPlace);
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  const load = useCallback(async (kind = tab) => {
    setBusy(true);
    const response = await fetch(`/api/admin/${kind}`);
    const data = await response.json();
    setRows(data[kind] ?? []);
    setMessage(response.ok ? "" : data.error ?? "读取失败");
    setBusy(false);
  }, [tab]);
  useEffect(() => { let active = true; fetch(`/api/admin/${tab}`).then((response)=>response.json().then((data)=>({response,data}))).then(({response,data})=>{ if (!active) return; setRows(data[tab] ?? []); setMessage(response.ok ? "" : data.error ?? "读取失败"); setBusy(false); }).catch(()=>{ if (active) { setMessage("读取失败"); setBusy(false); } }); return ()=>{ active=false; }; }, [tab]);
  const switchTab = (kind: "places"|"routes") => { setBusy(true); setTab(kind); setForm(kind === "places" ? emptyPlace : emptyRoute); setQuery(""); setMessage(""); };
  const change = (key: string, value: string|boolean) => setForm((current) => ({ ...current, [key]: value }));
  const save = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage("");
    const payload = tab === "routes" ? { ...form, placeIds:String(form.placeIds).split(/[、,，\n]/).map((v)=>v.trim()).filter(Boolean) } : form;
    const response = await fetch(`/api/admin/${tab}`, { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) setMessage(data.error ?? "保存失败");
    else { setMessage("已保存并同步到网站"); setForm(tab === "places" ? emptyPlace : emptyRoute); await load(tab); }
    setBusy(false);
  };
  const edit = (row: Row) => {
    const normalized = Object.fromEntries(Object.entries(row).map(([key,value]) => [key, typeof value === "boolean" ? value : Array.isArray(value) ? value.join("、") : String(value ?? "")]));
    for (const key of ["seasons","audience","theme","placeIds"]) if (typeof normalized[key] === "string" && String(normalized[key]).startsWith("[")) { try { normalized[key] = JSON.parse(String(normalized[key])).join("、"); } catch {} }
    setForm(normalized); document.getElementById("editor")?.scrollIntoView({ behavior:"smooth" });
  };
  const remove = async (id: string) => {
    if (!window.confirm("确认删除这条后台内容？预设内容不会受影响。")) return;
    setBusy(true); await fetch(`/api/admin/${tab}?id=${encodeURIComponent(id)}`, { method:"DELETE" }); await load(tab); setBusy(false);
  };
  const upload = async (file?: File) => {
    if (!file) return; setBusy(true); setMessage("正在上传媒体…");
    const body = new FormData(); body.append("file", file);
    const response = await fetch("/api/media", { method:"POST", body }); const data = await response.json();
    if (response.ok) { change("imageUrl", data.url); setMessage("上传完成，记得保存内容"); } else setMessage(data.error ?? "上传失败");
    setBusy(false);
  };
  const filtered = rows.filter((row) => `${row.name ?? ""}${row.category ?? ""}${row.theme ?? ""}`.toLowerCase().includes(query.toLowerCase()));

  return <main className="admin-shell" id="main">
    <aside className="admin-nav"><Link className="admin-logo" href="/"><span>青</span><div><strong>才哥管理台</strong><small>内容与路线工作台</small></div></Link><nav><button className={tab === "places" ? "active" : ""} onClick={()=>switchTab("places")}>地点资料</button><button className={tab === "routes" ? "active" : ""} onClick={()=>switchTab("routes")}>旅行方案</button></nav><div className="admin-user"><span>管理员</span><strong>{email}</strong><Link href="/">查看网站 ↗</Link></div></aside>
    <section className="admin-work"><header><div><p>跟着才哥游青岛</p><h1>{tab === "places" ? "地点资料库" : "推荐路线库"}</h1></div><div className="admin-stat"><strong>{rows.length}</strong><span>后台内容</span></div></header>
      <div className="admin-toolbar"><input aria-label="筛选内容" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="按名称、分类或标签筛选"/><button type="button" onClick={()=>{setForm(tab === "places" ? emptyPlace : emptyRoute); document.getElementById("editor")?.scrollIntoView({behavior:"smooth"});}}>＋ 新建{tab === "places" ? "地点" : "路线"}</button></div>
      <div className="admin-table" aria-live="polite">{busy && !rows.length ? <p>正在读取内容…</p> : filtered.map((row)=><article key={String(row.id)}><div><span>{String(row.category ?? row.durationLabel ?? "内容")}</span><h2>{String(row.name)}</h2><p>{String(row.summary ?? row.subtitle ?? "")}</p></div><div className="row-actions"><button onClick={()=>edit(row)}>编辑</button><button className="danger" onClick={()=>remove(String(row.id))}>删除</button></div></article>)}{!busy && !filtered.length && <p>这里还没有后台内容。预设内容仍会正常显示。</p>}</div>
    </section>
    <aside className="admin-editor" id="editor"><div className="editor-head"><span>{form.id ? "编辑内容" : "新建内容"}</span><h2>{tab === "places" ? "地点信息" : "旅行方案"}</h2><p>保存后自动进入网站内容库，标签可用于筛选管理。</p></div>
      <form onSubmit={save}>
        <label>名称<input required value={String(form.name)} onChange={(e)=>change("name",e.target.value)} /></label>
        <label>唯一标识<input value={String(form.id)} onChange={(e)=>change("id",e.target.value)} placeholder="可留空自动生成" /></label>
        {tab === "places" ? <>
          <label>分类<select value={String(form.category)} onChange={(e)=>change("category",e.target.value)}><option>城市漫游</option><option>山海自然</option><option>博物馆人文</option><option>亲子体验</option><option>美食</option></select></label>
          <label>文字介绍<textarea value={String(form.summary)} onChange={(e)=>change("summary",e.target.value)} /></label>
          <div className="form-pair"><label>建议停留（分钟）<input type="number" value={String(form.durationMinutes)} onChange={(e)=>change("durationMinutes",e.target.value)} /></label><label>难度<select value={String(form.difficulty)} onChange={(e)=>change("difficulty",e.target.value)}><option>轻松</option><option>适中</option><option>挑战</option></select></label></div>
          <div className="form-pair"><label>纬度<input inputMode="decimal" value={String(form.latitude)} onChange={(e)=>change("latitude",e.target.value)} /></label><label>经度<input inputMode="decimal" value={String(form.longitude)} onChange={(e)=>change("longitude",e.target.value)} /></label></div>
          <label>季节标签<input value={String(form.seasons)} onChange={(e)=>change("seasons",e.target.value)} placeholder="全年、暑期、寒假" /></label>
          <label>路况与提醒<textarea value={String(form.notes)} onChange={(e)=>change("notes",e.target.value)} /></label>
        </> : <>
          <label>副标题<input value={String(form.subtitle)} onChange={(e)=>change("subtitle",e.target.value)} /></label><label>路线介绍<textarea value={String(form.description)} onChange={(e)=>change("description",e.target.value)} /></label>
          <div className="form-pair"><label>时长<select value={String(form.durationLabel)} onChange={(e)=>change("durationLabel",e.target.value)}><option>半日</option><option>一日</option><option>三日</option></select></label><label>强度<select value={String(form.intensity)} onChange={(e)=>change("intensity",e.target.value)}><option>轻松</option><option>适中</option><option>挑战</option></select></label></div>
          <div className="form-pair"><label>总分钟<input type="number" value={String(form.totalMinutes)} onChange={(e)=>change("totalMinutes",e.target.value)} /></label><label>步行公里<input inputMode="decimal" value={String(form.walkingKm)} onChange={(e)=>change("walkingKm",e.target.value)} /></label></div>
          <label>地点标识（按顺序）<textarea value={String(form.placeIds)} onChange={(e)=>change("placeIds",e.target.value)} placeholder="christ-church、signal-hill、qinyu-road" /></label><label>季节标签<input value={String(form.seasons)} onChange={(e)=>change("seasons",e.target.value)} /></label><label>适合人群<input value={String(form.audience)} onChange={(e)=>change("audience",e.target.value)} /></label><label>主题标签<input value={String(form.theme)} onChange={(e)=>change("theme",e.target.value)} /></label>
          <label className="checkbox"><input type="checkbox" checked={Boolean(form.featured)} onChange={(e)=>change("featured",e.target.checked)} /> 首页优先推荐</label>
        </>}
        <label>照片或视频地址<input value={String(form.imageUrl)} onChange={(e)=>change("imageUrl",e.target.value)} /></label><label className="upload">上传照片 / MP4<input type="file" accept="image/jpeg,image/png,image/webp,video/mp4" onChange={(e)=>upload(e.target.files?.[0])} /></label>
        {message && <p className="admin-message" role="status">{message}</p>}<button className="admin-save" disabled={busy}>{busy ? "处理中…" : "保存并发布"}</button>
      </form>
    </aside>
  </main>;
}
