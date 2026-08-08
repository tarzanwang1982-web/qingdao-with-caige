"use client";

import { useEffect, useMemo, useState } from "react";

type WeatherDay = {
  date: string;
  code: number;
  max: number;
  min: number;
  apparentMax: number;
  apparentMin: number;
  rain: number;
  uv: number;
  wind: number;
  aqi: number | null;
};

const weatherName = (code: number) => code === 0 ? "晴" : code <= 3 ? "多云" : code <= 48 ? "雾" : code <= 57 ? "小雨" : code <= 67 ? "降雨" : code <= 77 ? "降雪" : code <= 82 ? "阵雨" : "雷雨";

function impact(day: WeatherDay) {
  if (day.code >= 95 || day.wind >= 55 || day.rain >= 80) return { level:"建议改期", tone:"danger", text:"天气可能明显影响安全与体验，建议比较前后日期，出发前复核官方预警。" };
  if (day.wind >= 35 || day.rain >= 55 || day.apparentMax >= 34 || day.apparentMin <= -5 || (day.aqi ?? 0) >= 150) return { level:"建议调整", tone:"warn", text:"适合减少海边和登高停留，优先安排室内地点或调整出发时间。" };
  return { level:"正常游玩", tone:"good", text:"当前趋势不会明显影响整体体验，按提示准备即可。" };
}

function packing(day: WeatherDay) {
  const list: string[] = [];
  if (day.apparentMax >= 28) list.push("轻薄透气衣物");
  if (day.apparentMin <= 12 || day.wind >= 25) list.push("防风外套");
  if (day.rain >= 35) list.push("雨具与防滑鞋");
  if (day.uv >= 6) list.push("防晒霜、帽子和补水");
  if ((day.aqi ?? 0) >= 100) list.push("敏感人群准备口罩");
  return list.length ? list : ["舒适步行鞋", "少量饮水"];
}

export function WeatherPanel({ date }: { date?: string }) {
  const [days, setDays] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetch("/api/weather")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("weather unavailable")))
      .then((data) => { if (active) setDays(data.days ?? []); })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const selected = useMemo(() => {
    if (!days.length) return null;
    if (date) return days.find((day) => day.date === date) ?? days[0];
    return days[0];
  }, [date, days]);

  if (loading) return <div className="weather-panel weather-loading" aria-live="polite">正在读取青岛天气趋势…</div>;
  if (!selected) return <div className="weather-panel"><strong>天气稍后更新</strong><span>路线仍可正常规划，出发前请再次查看天气。</span></div>;
  const status = impact(selected);
  return (
    <section className="weather-panel" aria-labelledby="weather-title">
      <div className="weather-main">
        <div><span className={`weather-status ${status.tone}`}>{status.level}</span><p id="weather-title">{date ? "计划当天" : "今天"} · {weatherName(selected.code)}</p></div>
        <strong>{Math.round(selected.min)}° <i>至</i> {Math.round(selected.max)}°</strong>
      </div>
      <p className="weather-advice">{status.text}</p>
      <div className="weather-metrics">
        <span><b>{Math.round(selected.apparentMin)}°–{Math.round(selected.apparentMax)}°</b>体感</span>
        <span><b>{Math.round(selected.rain)}%</b>降水</span>
        <span><b>{selected.uv.toFixed(1)}</b>紫外线</span>
        <span><b>{Math.round(selected.wind)} km/h</b>阵风</span>
        <span><b>{selected.aqi ? Math.round(selected.aqi) : "待更新"}</b>空气质量</span>
      </div>
      <div className="packing"><strong>提前准备</strong><span>{packing(selected).join("、")}</span></div>
      <small>天气为趋势判断；极端天气请以气象部门、景区和交通部门发布的信息为准。</small>
    </section>
  );
}
