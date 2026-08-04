import { requireChatGPTUser } from "../chatgpt-auth";
import { AdminClient } from "../../components/AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  return <AdminClient email={user.email} />;
}
