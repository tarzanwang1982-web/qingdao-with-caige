import { getDb } from "../../../db";
import { trips } from "../../../db/schema";

function bytesToHex(bytes: ArrayBuffer) { return [...new Uint8Array(bytes)].map((value) => value.toString(16).padStart(2,"0")).join(""); }
async function hash(value: string) { return bytesToHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))); }

export async function POST(request: Request) {
  const payload = await request.json() as Record<string, unknown>;
  if (!Array.isArray(payload.placeIds) || !payload.placeIds.length) return Response.json({ error:"请至少选择一个地点" }, { status:400 });
  const id = crypto.randomUUID().replaceAll("-", "").slice(0,16);
  const editToken = crypto.randomUUID().replaceAll("-", "");
  await getDb().insert(trips).values({
    id,
    editTokenHash:await hash(editToken),
    title:String(payload.title ?? "我的青岛行程").slice(0,80),
    startLabel:String(payload.startLabel ?? "我的出发点").slice(0,100),
    travelDate:String(payload.travelDate ?? ""),
    startTime:String(payload.startTime ?? "09:00"),
    pace:String(payload.pace ?? "标准游"),
    transport:String(payload.transport ?? "综合推荐"),
    placeIds:JSON.stringify(payload.placeIds),
    planJson:JSON.stringify(payload.plan ?? []),
  });
  return Response.json({ id, editToken, viewUrl:`/trip/${id}`, editUrl:`/trip/${id}?edit=${editToken}` }, { status:201 });
}
