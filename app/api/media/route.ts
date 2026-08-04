import { getDb } from "../../../db";
import { media } from "../../../db/schema";
import { getAdmin } from "../../../lib/admin";
import { getSiteRuntimeEnv } from "../../../lib/runtime-env";

export const dynamic = "force-dynamic";
const allowed = new Set(["image/jpeg", "image/png", "image/webp", "video/mp4"]);

export async function POST(request: Request) {
  const access = await getAdmin();
  if (!access.ok) return Response.json({ error:access.message }, { status:access.status });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error:"请选择文件" }, { status:400 });
  if (!allowed.has(file.type)) return Response.json({ error:"仅支持 JPG、PNG、WebP 或 MP4" }, { status:400 });
  if (file.size > 20 * 1024 * 1024) return Response.json({ error:"文件不能超过 20MB" }, { status:400 });
  const id = crypto.randomUUID();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `uploads/${id}-${safeName}`;
  const bucket = getSiteRuntimeEnv().BUCKET;
  if (!bucket) return Response.json({ error:"媒体存储暂时不可用" }, { status:503 });
  await bucket.put(key, file.stream(), { httpMetadata:{ contentType:file.type } });
  await getDb().insert(media).values({ id, key, fileName:file.name, mimeType:file.type, sizeBytes:file.size });
  return Response.json({ id, url:`/api/media/${key}` }, { status:201 });
}
