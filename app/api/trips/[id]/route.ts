import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { trips } from "../../../../db/schema";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id:string }> }) {
  const { id } = await context.params;
  const [trip] = await getDb().select().from(trips).where(eq(trips.id,id)).limit(1);
  if (!trip) return Response.json({ error:"没有找到这条行程" }, { status:404 });
  return Response.json({ trip:{ ...trip, placeIds:JSON.parse(trip.placeIds), plan:JSON.parse(trip.planJson), editTokenHash:undefined, planJson:undefined } });
}
