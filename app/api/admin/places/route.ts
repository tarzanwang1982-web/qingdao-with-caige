import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { places } from "../../../../db/schema";
import { getAdmin } from "../../../../lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await getAdmin();
  if (!access.ok) return Response.json({ error:access.message }, { status:access.status });
  return Response.json({ places: await getDb().select().from(places) });
}

export async function POST(request: Request) {
  const access = await getAdmin();
  if (!access.ok) return Response.json({ error:access.message }, { status:access.status });
  const data = await request.json() as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  if (!name) return Response.json({ error:"请填写地点名称" }, { status:400 });
  const id = String(data.id ?? name.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9\u4e00-\u9fa5-]/g,"")).slice(0,60) || crypto.randomUUID();
  const value = {
    id,
    name,
    category:String(data.category ?? "城市漫游"),
    summary:String(data.summary ?? ""),
    imageUrl:String(data.imageUrl ?? ""),
    latitude:Number(data.latitude ?? 36.0671),
    longitude:Number(data.longitude ?? 120.3826),
    durationMinutes:Number(data.durationMinutes ?? 60),
    difficulty:String(data.difficulty ?? "轻松"),
    seasons:String(data.seasons ?? "全年"),
    weatherSensitivity:String(data.weatherSensitivity ?? "普通"),
    notes:String(data.notes ?? ""),
    status:String(data.status ?? "published"),
    updatedAt:new Date().toISOString(),
  };
  await getDb().insert(places).values(value).onConflictDoUpdate({ target:places.id, set:value });
  return Response.json({ place:value }, { status:201 });
}

export async function DELETE(request: Request) {
  const access = await getAdmin();
  if (!access.ok) return Response.json({ error:access.message }, { status:access.status });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error:"缺少地点标识" }, { status:400 });
  await getDb().delete(places).where(eq(places.id, id));
  return Response.json({ ok:true });
}
