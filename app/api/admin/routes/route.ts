import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { routes } from "../../../../db/schema";
import { getAdmin } from "../../../../lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await getAdmin();
  if (!access.ok) return Response.json({ error: access.message }, { status: access.status });
  return Response.json({ routes: await getDb().select().from(routes) });
}

export async function POST(request: Request) {
  const access = await getAdmin();
  if (!access.ok) return Response.json({ error: access.message }, { status: access.status });
  const data = await request.json() as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  if (!name) return Response.json({ error: "请填写路线名称" }, { status: 400 });
  const id = String(data.id ?? name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "")).slice(0, 60) || crypto.randomUUID();
  const list = (value: unknown) => Array.isArray(value) ? value.map(String) : String(value ?? "").split(/[、,，]/).map((item) => item.trim()).filter(Boolean);
  const value = {
    id,
    name,
    subtitle: String(data.subtitle ?? "才哥精选的青岛路线"),
    description: String(data.description ?? ""),
    imageUrl: String(data.imageUrl ?? "/images/route-oldcity.webp"),
    durationLabel: String(data.durationLabel ?? "一日"),
    totalMinutes: Number(data.totalMinutes ?? 480),
    walkingKm: Number(data.walkingKm ?? 5),
    intensity: String(data.intensity ?? "适中"),
    seasons: JSON.stringify(list(data.seasons).length ? list(data.seasons) : ["全年"]),
    audience: JSON.stringify(list(data.audience).length ? list(data.audience) : ["全家"]),
    theme: JSON.stringify(list(data.theme).length ? list(data.theme) : ["经典"]),
    placeIds: JSON.stringify(list(data.placeIds)),
    featured: Boolean(data.featured),
    status: String(data.status ?? "published"),
    updatedAt: new Date().toISOString(),
  };
  await getDb().insert(routes).values(value).onConflictDoUpdate({ target: routes.id, set: value });
  return Response.json({ route: value }, { status: 201 });
}

export async function DELETE(request: Request) {
  const access = await getAdmin();
  if (!access.ok) return Response.json({ error: access.message }, { status: access.status });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "缺少路线标识" }, { status: 400 });
  await getDb().delete(routes).where(eq(routes.id, id));
  return Response.json({ ok: true });
}
