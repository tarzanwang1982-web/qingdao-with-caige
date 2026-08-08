import { getSiteRuntimeEnv } from "../../../../lib/runtime-env";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  const bucket = getSiteRuntimeEnv().BUCKET;
  if (!bucket) return new Response("Media unavailable", { status:503 });
  const object = await bucket.get(key.join("/"));
  if (!object) return new Response("Not found", { status:404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}
