import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { WeatherPanel } from "../../../components/WeatherPanel";
import { CuratedRoute, Place, placeById, routes } from "../../../lib/data";
import { amapUrl } from "../../../lib/planner";
import { getDb } from "../../../db";
import { places as placesTable, routes as routesTable } from "../../../db/schema";

export const dynamic = "force-dynamic";
const list = (value:string):string[] => { try { return JSON.parse(value); } catch { return value.split(/[、,，]/).filter(Boolean); } };
async function findRoute(id:string):Promise<CuratedRoute|undefined> {
  const preset = routes.find((item)=>item.id===id);
  try { const [row] = await getDb().select().from(routesTable).where(eq(routesTable.id,id)).limit(1); if (row?.status === "published") return { id:row.id,name:row.name,subtitle:row.subtitle,description:row.description,image:row.imageUrl || "/images/route-oldcity.webp",duration:row.durationLabel,minutes:row.totalMinutes,walkingKm:row.walkingKm,intensity:row.intensity as CuratedRoute["intensity"],seasons:list(row.seasons),audience:list(row.audience),theme:list(row.theme),placeIds:list(row.placeIds),featured:row.featured,seasonNote:"路线与天气会变化，出发前请复核最新提醒。" }; } catch {}
  return preset;
}
export async function generateMetadata({ params }:{ params:Promise<{id:string}> }):Promise<Metadata> { const {id}=await params; const route=await findRoute(id); return { title:route?.name ?? "推荐路线", description:route?.description }; }

export default async function RoutePage({ params }:{ params:Promise<{id:string}> }) {
  const { id } = await params;
  const route = await findRoute(id);
  if (!route) notFound();
  const customPlaces:Record<string,Place> = {};
  try { const rows = await getDb().select().from(placesTable); rows.filter((row)=>row.status === "published").forEach((row)=>{ customPlaces[row.id] = { id:row.id,name:row.name,category:row.category as Place["category"],summary:row.summary,image:row.imageUrl || "/images/route-oldcity.webp",lat:row.latitude,lng:row.longitude,duration:row.durationMinutes,difficulty:row.difficulty as Place["difficulty"],seasons:row.seasons.split(/[、,，]/),weatherSensitivity:row.weatherSensitivity as Place["weatherSensitivity"],note:row.notes || "出发前请复核现场信息",slope:row.notes || "以现场路况为准" }; }); } catch {}
  const stops = route.placeIds.map((placeId) => customPlaces[placeId] ?? placeById[placeId]).filter(Boolean);
  const mapImage = id === "coastal-walk" ? "/images/map-coast.webp" : "/images/map-oldcity.webp";
  return <><Header /><main id="main" className="route-page">
    <section className="route-hero"><Image unoptimized src={route.image} alt={`${route.name}路线主视觉`} fill priority sizes="100vw" /><div className="route-hero-scrim"/><div className="route-hero-content"><Link href="/#routes">← 返回推荐路线</Link><div className="route-meta">{route.theme.map((tag)=><span key={tag}>{tag}</span>)}</div><h1>{route.name}</h1><p>{route.subtitle}</p><div className="route-facts"><span><b>{route.duration}</b>建议时长</span><span><b>{route.walkingKm} km</b>步行距离</span><span><b>{route.intensity}</b>游览强度</span><span><b>{stops.length} 站</b>精选地点</span></div></div></section>
    <section className="route-overview"><div><p className="route-label">路线说明</p><h2>{route.description}</h2><p>{route.seasonNote}</p><div className="audience-tags">适合：{route.audience.join("、")}</div><Link className="button primary" href={`/planner?route=${route.id}`}>按我的时间重新规划</Link></div><WeatherPanel /></section>
    <section className="route-map-section"><div className="route-map-copy"><p className="route-label">路线全貌</p><h2>先看清楚，再出发</h2><p>地图来自才哥原始路线底稿。正式导航时，每一站都可以单独打开高德。</p></div><div className="route-map-image"><Image unoptimized src={mapImage} alt={`${route.name}路线地图`} fill sizes="(max-width:800px) 100vw, 70vw" /></div></section>
    <section className="route-stops"><div className="section-heading"><div><p>照着游览</p><h2>每一站，都有为什么</h2></div><p>停留时间是建议值。遇到排队、天气变化或体力不足，可以跳过一站，后面的路线仍然成立。</p></div><ol>{stops.map((place,index)=><li key={place.id}><div className="stop-index">{String(index+1).padStart(2,"0")}</div><div className="stop-image"><Image unoptimized src={place.image} alt={`${place.name}编辑插画`} fill sizes="(max-width:800px) 100vw, 34vw" /></div><div className="stop-content"><div className="stop-tags"><span>{place.category}</span><span>{place.duration}分钟</span><span>{place.difficulty}</span></div><h3>{place.name}</h3><p>{place.summary}</p><dl><div><dt>路况</dt><dd>{place.slope}</dd></div><div><dt>天气</dt><dd>{place.weatherSensitivity === "高" ? "风雨对体验影响明显" : "普通天气可正常安排"}</dd></div><div><dt>提醒</dt><dd>{place.note}</dd></div>{place.reservation&&<div><dt>预约</dt><dd>{place.reservation}</dd></div>}</dl><a className="text-link dark" href={amapUrl(place)} target="_blank" rel="noreferrer">打开高德前往这里 ↗</a></div></li>)}</ol></section>
    <section className="route-final"><h2>保存一条属于你的青岛路线</h2><p>更换出发点、日期和节奏，系统会重新整理交通与时间。</p><Link className="button primary" href={`/planner?route=${route.id}`}>复制并调整这条路线</Link></section>
  </main><Footer /></>;
}
