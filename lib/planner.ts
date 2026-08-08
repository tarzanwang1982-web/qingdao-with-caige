import type { Place } from "./data";

export type PlanStop = {
  place: Place;
  arrival: string;
  departure: string;
  travelMinutes: number;
  walkingMinutes: number;
  transitMinutes: number;
  taxiMinutes: number;
  recommendedMode: "步行" | "公交" | "打车";
};

function distanceKm(a: Place, b: Place) {
  const radius = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function timeText(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function optimizePlaces(selected: Place[]) {
  if (selected.length < 2) return selected;
  const remaining = selected.slice(1);
  const ordered = [selected[0]];
  while (remaining.length) {
    const last = ordered[ordered.length - 1];
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    remaining.forEach((candidate, index) => {
      const d = distanceKm(last, candidate);
      if (d < bestDistance) {
        bestDistance = d;
        bestIndex = index;
      }
    });
    ordered.push(remaining.splice(bestIndex, 1)[0]);
  }
  return ordered;
}

export function buildPlan(selected: Place[], startTime: string, transport: string, pace: string): PlanStop[] {
  const ordered = optimizePlaces(selected);
  const [hours, minutes] = startTime.split(":").map(Number);
  let cursor = hours * 60 + minutes;
  const paceFactor = pace === "轻松游" ? 1.2 : pace === "紧凑游" ? 0.82 : 1;

  return ordered.map((place, index) => {
    let walkingMinutes = 0;
    let transitMinutes = 0;
    let taxiMinutes = 0;
    if (index > 0) {
      const km = distanceKm(ordered[index - 1], place);
      walkingMinutes = Math.max(5, Math.round((km / 4.5) * 60));
      transitMinutes = Math.max(16, Math.round(12 + (km / 20) * 60));
      taxiMinutes = Math.max(9, Math.round(7 + (km / 32) * 60));
    }
    const recommendedMode = transport === "公交优先" ? "公交" : transport === "打车优先" ? "打车" : walkingMinutes <= 22 ? "步行" : transitMinutes <= taxiMinutes + 8 ? "公交" : "打车";
    const travelMinutes = recommendedMode === "步行" ? walkingMinutes : recommendedMode === "公交" ? transitMinutes : taxiMinutes;
    cursor += travelMinutes;
    const arrival = timeText(cursor);
    cursor += Math.round(place.duration * paceFactor);
    return { place, arrival, departure: timeText(cursor), travelMinutes, walkingMinutes, transitMinutes, taxiMinutes, recommendedMode };
  });
}

export function amapUrl(place: Place) {
  const params = new URLSearchParams({
    sourceApplication: "跟着才哥游青岛",
    poiname: place.name,
    lat: String(place.lat),
    lon: String(place.lng),
    dev: "0",
    style: "2",
  });
  return `https://uri.amap.com/marker?${params.toString()}`;
}
