export type SiteRuntimeEnv = {
  DB?: D1Database;
  BUCKET?: R2Bucket;
};

export function getSiteRuntimeEnv(): SiteRuntimeEnv {
  return (globalThis as typeof globalThis & { __QINGDAO_SITE_ENV__?: SiteRuntimeEnv }).__QINGDAO_SITE_ENV__ ?? {};
}
