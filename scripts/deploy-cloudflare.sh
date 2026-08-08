#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
generated_redirect="${project_root}/.wrangler/deploy/config.json"

# Cloudflare Git deployments must use the repository's deployment config,
# not the local preview redirect generated during the framework build.
if [[ -f "${generated_redirect}" ]]; then
  mv "${generated_redirect}" "${generated_redirect}.local-preview"
fi

exec "${project_root}/node_modules/.bin/wrangler" deploy \
  --config "${project_root}/wrangler.jsonc"
