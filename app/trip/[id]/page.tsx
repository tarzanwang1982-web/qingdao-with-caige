import type { Metadata } from "next";
import { TripView } from "../../../components/TripView";

export const dynamic = "force-dynamic";
export const metadata:Metadata={title:"我的青岛行程"};
export default async function TripPage({params}:{params:Promise<{id:string}>}){const {id}=await params;return <TripView id={id}/>;}
