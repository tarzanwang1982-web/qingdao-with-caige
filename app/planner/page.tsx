import type { Metadata } from "next";
import { PlannerClient } from "../../components/PlannerClient";

export const metadata: Metadata = { title:"定制我的青岛行程" };

export default async function PlannerPage({ searchParams }:{ searchParams:Promise<{route?:string}> }) {
  const { route } = await searchParams;
  return <PlannerClient initialRouteId={route} />;
}
