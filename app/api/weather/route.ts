export const dynamic = "force-dynamic";

type Forecast = { daily: Record<string, Array<string|number|null>> };
type AirForecast = { hourly?: { time?: string[]; us_aqi?: Array<number|null> } };

export async function GET() {
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.search = new URLSearchParams({
    latitude: "36.0671",
    longitude: "120.3826",
    timezone: "Asia/Shanghai",
    forecast_days: "10",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,uv_index_max,wind_gusts_10m_max",
  }).toString();
  const airUrl = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
  airUrl.search = new URLSearchParams({ latitude:"36.0671", longitude:"120.3826", timezone:"Asia/Shanghai", forecast_days:"7", hourly:"us_aqi" }).toString();

  try {
    const [weatherResponse, airResponse] = await Promise.all([
      fetch(weatherUrl, { headers: { accept: "application/json" } }),
      fetch(airUrl, { headers: { accept: "application/json" } }),
    ]);
    if (!weatherResponse.ok) throw new Error("weather provider unavailable");
    const weather = await weatherResponse.json() as Forecast;
    const air = airResponse.ok ? await airResponse.json() as AirForecast : null;
    const airByDate = new Map<string, number>();
    if (air?.hourly?.time && air?.hourly?.us_aqi) {
      air.hourly.time.forEach((stamp: string, index: number) => {
        const date = stamp.slice(0, 10);
        const value = Number(air.hourly.us_aqi[index]);
        if (Number.isFinite(value)) airByDate.set(date, Math.max(airByDate.get(date) ?? 0, value));
      });
    }
    const daily = weather.daily;
    const days = daily.time.map((date: string, index: number) => ({
      date,
      code: daily.weather_code[index],
      max: daily.temperature_2m_max[index],
      min: daily.temperature_2m_min[index],
      apparentMax: daily.apparent_temperature_max[index],
      apparentMin: daily.apparent_temperature_min[index],
      rain: daily.precipitation_probability_max[index],
      uv: daily.uv_index_max[index],
      wind: daily.wind_gusts_10m_max[index],
      aqi: airByDate.get(date) ?? null,
    }));
    return Response.json({ days, updatedAt: new Date().toISOString(), source: "Open-Meteo" }, { headers: { "cache-control": "public, max-age=1800" } });
  } catch {
    return Response.json({ days: [], error: "天气暂时无法更新" }, { status: 503 });
  }
}
