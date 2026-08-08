import { eq } from "drizzle-orm";
import { getChatGPTUser } from "../app/chatgpt-auth";
import { getDb } from "../db";
import { admins } from "../db/schema";

export async function getAdmin() {
  const user = await getChatGPTUser();
  if (!user) return { ok:false as const, status:401, message:"请先使用 ChatGPT 登录" };
  const db = getDb();
  const existing = await db.select().from(admins).limit(1);
  if (!existing.length) {
    await db.insert(admins).values({ email:user.email }).onConflictDoNothing();
    return { ok:true as const, user };
  }
  const allowed = await db.select().from(admins).where(eq(admins.email, user.email)).limit(1);
  if (!allowed.length) return { ok:false as const, status:403, message:"当前账号没有管理权限" };
  return { ok:true as const, user };
}
