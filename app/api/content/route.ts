import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { places as placesTable, routes as routesTable } from "../../../db/schema";
import { places, routes } from "../../../lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const [customPlaces, customRoutes] = await Promise.all([
      db.select().from(placesTable).orderBy(desc(placesTable.updatedAt)),
      db.select().from(routesTable).orderBy(desc(routesTable.updatedAt)),
    ]);
    return Response.json({ places, routes, customPlaces, customRoutes });
  } catch {
    return Response.json({ places, routes, customPlaces:[], customRoutes:[] });
  }
}
