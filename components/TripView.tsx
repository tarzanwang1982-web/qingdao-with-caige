"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Place, placeById } from "../lib/data";
import { amapUrl } from "../lib/planner";
import { WeatherPanel } from "./WeatherPanel";

type PlanItem = { placeId:string; arrival:string; departure:string };
type Trip = { travelDate:string; startTime:string; title:string; startLabel:string; pace:string; transport:string; plan:PlanItem[] };

export function TripView({ id }:{ id:string }) {
  const [trip,setTrip]=useState<Trip|null>(null); const [error,setError]=useState(""); const [done,setDone]=useState<string[]>([]); const [customPlaces,setCustomPlaces]=useState<Record<string,Place>>({});
  useEffect(()=>{ Promise.all([fetch(`/api/trips/${id}`).then(async response=>{const data=await response.json();if(!response.ok)throw new Error(data.error);return data.trip as Trip;}),fetch("/api/content").then(response=>response.json()).catch(()=>({customPlaces:[]}))]).then(([saved,content])=>{ setTrip(saved); const entries = (content.customPlaces ?? []).map((row:Record<string,unknown>)=>[String(row.id),{id:String(row.id),name:String(row.name),category:String(row.category) as Place["category"],summary:String(row.summary),image:String(row.imageUrl || "/images/route-oldcity.webp"),lat:Number(row.latitude),lng:Number(row.longitude),duration:Number(row.durationMinutes),difficulty:String(row.difficulty) as Place["difficulty"],seasons:String(row.seasons||"全年").split(/[、,，]/),weatherSensitivity:String(row.weatherSensitivity||"中") as Place["weatherSensitivity"],note:String(row.notes||"出发前请复核现场信息"),slope:String(row.notes||"以现场路况为准")}]); setCustomPlaces(Object.fromEntries(entries)); }).catch(cause=>setError(cause instanceof Error ? cause.message : "读取失败")); },[id]);
  if(error) return <div className="trip-state"><h1>这条行程暂时打不开</h1><p>{error}</p><Link href="/planner">重新规划一条路线</Link></div>;
  if(!trip) return <div className="trip-state">正在打开行程…</div>;
  return <main className="shared-trip" id="main"><header><Link href="/">跟着才哥游青岛</Link><span>分享行程</span></header><section className="trip-title"><p>{trip.travelDate} · {trip.startTime} 出发</p><h1>{trip.title}</h1><span>从 {trip.startLabel} 开始 · {trip.pace} · {trip.transport}</span></section><div className="trip-weather"><WeatherPanel date={trip.travelDate}/></div><ol>{trip.plan.map((item,index)=>{const place=customPlaces[item.placeId] ?? placeById[item.placeId];if(!place)return null;const complete=done.includes(place.id);return <li className={complete?"complete":""} key={place.id}><button type="button" aria-label={complete?`取消完成${place.name}`:`标记完成${place.name}`} onClick={()=>setDone(current=>complete?current.filter(placeId=>placeId!==place.id):[...current,place.id])}>{complete?"✓":index+1}</button><div><span>{item.arrival} 到达 · {item.departure} 离开</span><h2>{place.name}</h2><p>{place.note}</p><a href={amapUrl(place)} target="_blank" rel="noreferrer">开始导航 ↗</a></div></li>})}</ol><footer><p>已完成 {done.length} / {trip.plan.length} 站</p><Link href="/planner">复制为我的路线</Link></footer></main>;
}
