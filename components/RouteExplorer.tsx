"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CuratedRoute, routeFilters, routes as presetRoutes } from "../lib/data";

const list = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String);
  try { const parsed = JSON.parse(String(value ?? "[]")); return Array.isArray(parsed) ? parsed.map(String) : []; } catch { return String(value ?? "").split(/[、,，]/).filter(Boolean); }
};

function toRoute(row: Record<string, unknown>): CuratedRoute {
  return { id:String(row.id), name:String(row.name), subtitle:String(row.subtitle), description:String(row.description), image:String(row.imageUrl || "/images/route-oldcity.webp"), duration:String(row.durationLabel || "一日"), minutes:Number(row.totalMinutes || 480), walkingKm:Number(row.walkingKm || 5), intensity:String(row.intensity || "适中") as CuratedRoute["intensity"], seasons:list(row.seasons), audience:list(row.audience), theme:list(row.theme), placeIds:list(row.placeIds), featured:Boolean(row.featured), seasonNote:"路线与天气会变化，出发前请复核最新提醒。" };
}

export function RouteExplorer() {
  const [routes, setRoutes] = useState(presetRoutes);
  const [duration, setDuration] = useState("全部");
  const [season, setSeason] = useState("全部");
  useEffect(() => { fetch("/api/content").then((response)=>response.json()).then((data)=>{ const custom = (data.customRoutes ?? []).filter((row:Record<string,unknown>)=>row.status === "published").map(toRoute); const byId = new Map(presetRoutes.map((route)=>[route.id,route])); custom.forEach((route:CuratedRoute)=>byId.set(route.id,route)); setRoutes([...byId.values()].sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured)))); }).catch(()=>{}); }, []);
  const shown = useMemo(() => routes.filter((route) => (duration === "全部" || route.duration === duration) && (season === "全部" || route.seasons.includes(season))), [duration, season, routes]);
  return (
    <div>
      <div className="filters" aria-label="路线筛选">
        <div><span>时长</span>{routeFilters.duration.map((item) => <button key={item} type="button" className={duration === item ? "active" : ""} aria-pressed={duration === item} onClick={() => setDuration(item)}>{item}</button>)}</div>
        <div><span>季节</span>{routeFilters.season.slice(0, 6).map((item) => <button key={item} type="button" className={season === item ? "active" : ""} aria-pressed={season === item} onClick={() => setSeason(item)}>{item}</button>)}</div>
      </div>
      <div className="route-grid">
        {shown.map((route, index) => (
          <article className={index === 0 ? "route-card route-card-large" : "route-card"} key={route.id}>
            <div className="route-image"><Image unoptimized src={route.image} alt={`${route.name}路线编辑插画`} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 58vw" : "(max-width: 800px) 100vw, 34vw"} /></div>
            <div className="route-card-body">
              <div className="route-meta"><span>{route.duration}</span><span>{route.intensity}</span><span>{route.walkingKm}公里</span></div>
              <h3>{route.name}</h3><p className="route-subtitle">{route.subtitle}</p><p>{route.description}</p>
              <div className="route-tags">{route.theme.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <Link className="text-link" href={`/routes/${route.id}`}>查看完整路线 <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </div>
      {!shown.length && <p className="empty-state">暂时没有符合条件的路线，换一个季节看看。</p>}
    </div>
  );
}
