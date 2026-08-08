"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Place, places, routes } from "../lib/data";
import { amapUrl, buildPlan } from "../lib/planner";
import { WeatherPanel } from "./WeatherPanel";

const today = new Date().toISOString().slice(0,10);

export function PlannerClient({ initialRouteId }: { initialRouteId?: string }) {
  const initialSelection = routes.find((route) => route.id === initialRouteId)?.placeIds ?? ["christ-church","signal-hill","governor-house","qinyu-road"];
  const [selected, setSelected] = useState<string[]>(initialSelection);
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>(places);
  const [startLabel, setStartLabel] = useState("青岛站");
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("09:00");
  const [pace, setPace] = useState("标准游");
  const [transport, setTransport] = useState("综合推荐");
  const [saved, setSaved] = useState<{viewUrl:string;editUrl:string}|null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { fetch("/api/content").then((response)=>response.json()).then((data)=>{ const customPlaces:Place[] = (data.customPlaces ?? []).filter((row:Record<string,unknown>)=>row.status === "published").map((row:Record<string,unknown>)=>({ id:String(row.id),name:String(row.name),category:String(row.category) as Place["category"],summary:String(row.summary),image:String(row.imageUrl || "/images/route-oldcity.webp"),lat:Number(row.latitude),lng:Number(row.longitude),duration:Number(row.durationMinutes),difficulty:String(row.difficulty) as Place["difficulty"],seasons:String(row.seasons || "全年").split(/[、,，]/),weatherSensitivity:String(row.weatherSensitivity || "中") as Place["weatherSensitivity"],note:String(row.notes || "出发前请复核现场信息"),slope:String(row.notes || "以现场路况为准") })); const merged = new Map(places.map((place)=>[place.id,place])); customPlaces.forEach((place)=>merged.set(place.id,place)); setAvailablePlaces([...merged.values()]); const customRoute = (data.customRoutes ?? []).find((row:Record<string,unknown>)=>row.id === initialRouteId); if (customRoute) { try { setSelected(JSON.parse(String(customRoute.placeIds))); } catch {} } }).catch(()=>{}); }, [initialRouteId]);
  const selectedPlaces = useMemo(() => selected.map((id) => availablePlaces.find((place) => place.id === id)).filter(Boolean) as Place[], [selected, availablePlaces]);
  const plan = useMemo(() => buildPlan(selectedPlaces, startTime, transport, pace), [selectedPlaces, startTime, transport, pace]);
  const last = plan.at(-1);
  const totalMinutes = plan.reduce((total, item) => total + item.travelMinutes + item.place.duration, 0);
  const multiDay = totalMinutes > 600;

  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const save = async () => {
    setSaving(true); setError("");
    try {
      const response = await fetch("/api/trips", { method:"POST", headers:{ "content-type":"application/json" }, body:JSON.stringify({ title:`${date} 青岛行程`, startLabel, travelDate:date, startTime, pace, transport, placeIds:selected, plan:plan.map(({place,...item}) => ({...item,placeId:place.id})) }) });
      const raw = await response.text();
      const data = raw.trim().startsWith("{") ? JSON.parse(raw) : {};
      if (!response.ok) throw new Error(data.error ?? "保存失败");
      setSaved({ viewUrl:data.viewUrl, editUrl:data.editUrl });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "保存失败，请稍后重试"); }
    finally { setSaving(false); }
  };

  return <div className="planner-shell">
    <aside className="planner-sidebar">
      <div className="planner-brand"><span>青</span><div><strong>定制我的行程</strong><small>只从才哥精选地点中选择</small></div></div>
      <div className="planner-step"><b>1</b><div><strong>基本安排</strong><span>日期、时间与出发点</span></div></div>
      <label>出行日期<input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} /></label>
      <label>出发时间<input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} /></label>
      <label>出发地点<input value={startLabel} onChange={(event) => setStartLabel(event.target.value)} placeholder="酒店、车站或当前位置" /></label>
      <label>游览节奏<select value={pace} onChange={(event) => setPace(event.target.value)}><option>轻松游</option><option>标准游</option><option>紧凑游</option></select></label>
      <label>交通偏好<select value={transport} onChange={(event) => setTransport(event.target.value)}><option>综合推荐</option><option>公交优先</option><option>打车优先</option></select></label>
      <Link className="planner-back" href="/">← 返回推荐路线</Link>
    </aside>

    <main className="planner-main" id="main">
      <header className="planner-top"><div><span>步骤 2 / 2</span><h1>挑选想去的地方</h1><p>选择后会自动减少折返。你仍然可以调整或删除。</p></div><div className="selection-count"><strong>{selected.length}</strong><span>已选地点</span></div></header>
      <div className="place-picker" role="group" aria-label="精选地点">
        {availablePlaces.map((place) => <button key={place.id} type="button" className={selected.includes(place.id) ? "place-choice selected" : "place-choice"} aria-pressed={selected.includes(place.id)} onClick={() => toggle(place.id)}><span className="choice-check" aria-hidden="true">{selected.includes(place.id) ? "✓" : "+"}</span><span><strong>{place.name}</strong><small>{place.category} · {place.duration}分钟</small></span><em>{place.difficulty}</em></button>)}
      </div>
    </main>

    <aside className="plan-preview">
      <div className="preview-sticky"><div className="preview-head"><div><span>行程预览</span><h2>{date || "选择日期"}</h2></div><strong>{last?.departure ?? startTime}<small>预计结束</small></strong></div>
        <div className="mini-weather"><WeatherPanel date={date} /></div>
        {multiDay && <div className="split-notice"><strong>建议拆成两天</strong><span>当前选择约需 {Math.round(totalMinutes/60)} 小时。系统会优先保留相邻地点，避免赶路。</span></div>}
        <ol className="plan-timeline">{plan.map((item, index) => <li key={item.place.id}><span className="timeline-dot">{index+1}</span><div><div className="time-row"><b>{item.arrival}</b><span>{item.recommendedMode} {item.travelMinutes ? `${item.travelMinutes}分钟` : "从出发点开始"}</span></div><strong>{item.place.name}</strong><p>{item.place.note}</p><div className="mode-compare"><span>走 {item.walkingMinutes}分</span><span>公交 {item.transitMinutes}分</span><span>车 {item.taxiMinutes}分</span></div><a href={amapUrl(item.place)} target="_blank" rel="noreferrer">打开高德到这一站 ↗</a></div></li>)}</ol>
        {!plan.length && <div className="preview-empty">选择至少一个地点，行程会出现在这里。</div>}
        {error && <p className="form-error" role="alert">{error}</p>}
        {saved ? <div className="saved-box"><strong>行程已经保存</strong><label>分享查看链接<input readOnly value={`${location.origin}${saved.viewUrl}`} onFocus={(event) => event.currentTarget.select()} /></label><label>私密管理链接<input readOnly value={`${location.origin}${saved.editUrl}`} onFocus={(event) => event.currentTarget.select()} /></label><button type="button" onClick={() => navigator.clipboard.writeText(`${location.origin}${saved.viewUrl}`)}>复制分享链接</button></div> : <button className="save-trip" type="button" disabled={!selected.length || saving} onClick={save}>{saving ? "保存中…" : selected.length ? "保存并生成分享链接" : "请先选择地点"}</button>}
      </div>
    </aside>
  </div>;
}
