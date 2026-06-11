#!/usr/bin/env node
// @ts-check
/**
 * i18n drift checker — xương sống deterministic cho i18n Sync Agent.
 *
 * Kiểm tra hai tập file đa ngôn ngữ phải luôn có CÙNG tập key:
 *   - messages/<locale>.json              (UI strings cho next-intl)
 *   - src/constants/profileData/<locale>.json  (dữ liệu profile)
 *
 * Locale gốc (nguồn sự thật) = "vi" (default locale của dự án).
 *
 * Dùng:
 *   node scripts/check-i18n.mjs           # kiểm tra, exit 1 nếu lệch
 *   node scripts/check-i18n.mjs --json    # xuất JSON cho agent đọc
 *
 * Agent đọc output này để biết CHÍNH XÁC key nào thiếu/thừa ở ngôn ngữ nào,
 * rồi chỉ dịch đúng phần thiếu — không phải đọc toàn bộ file.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE_LOCALE = "vi";
const LOCALES = ["vi", "en", "zh", "hi", "ja", "ko"];

/** Hai nhóm file phải đồng bộ key. */
const GROUPS = [
  { name: "messages", path: (l) => join(ROOT, "messages", `${l}.json`) },
  {
    name: "profileData",
    path: (l) => join(ROOT, "src", "constants", "profileData", `${l}.json`),
  },
];

/** Làm phẳng object thành danh sách key dạng "a.b.c". Mảng coi là 1 lá. */
function flattenKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? flattenKeys(v, `${prefix}${k}.`)
      : [`${prefix}${k}`]
  );
}

function loadJson(path) {
  if (!existsSync(path)) return { error: "FILE_NOT_FOUND" };
  try {
    return { data: JSON.parse(readFileSync(path, "utf8")) };
  } catch (e) {
    return { error: `INVALID_JSON: ${e.message}` };
  }
}

const report = { ok: true, groups: [] };

for (const group of GROUPS) {
  const baseLoaded = loadJson(group.path(BASE_LOCALE));
  if (baseLoaded.error) {
    report.ok = false;
    report.groups.push({ group: group.name, baseError: baseLoaded.error });
    continue;
  }
  const baseKeys = new Set(flattenKeys(baseLoaded.data));
  const groupReport = { group: group.name, baseKeyCount: baseKeys.size, locales: [] };

  for (const locale of LOCALES) {
    if (locale === BASE_LOCALE) continue;
    const loaded = loadJson(group.path(locale));
    if (loaded.error) {
      report.ok = false;
      groupReport.locales.push({ locale, error: loaded.error });
      continue;
    }
    const keys = new Set(flattenKeys(loaded.data));
    const missing = [...baseKeys].filter((k) => !keys.has(k)); // có ở vi, thiếu ở locale
    const extra = [...keys].filter((k) => !baseKeys.has(k)); // có ở locale, không có ở vi
    if (missing.length || extra.length) report.ok = false;
    groupReport.locales.push({ locale, keyCount: keys.size, missing, extra });
  }
  report.groups.push(groupReport);
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.ok ? 0 : 1);
}

// --- Human-readable output ---
const RED = "\x1b[31m", GREEN = "\x1b[32m", YELLOW = "\x1b[33m", DIM = "\x1b[2m", RESET = "\x1b[0m";
console.log(`\ni18n drift check  ${DIM}(base locale: ${BASE_LOCALE})${RESET}\n`);

for (const g of report.groups) {
  if (g.baseError) {
    console.log(`${RED}✗ ${g.group}: base file lỗi — ${g.baseError}${RESET}`);
    continue;
  }
  console.log(`${DIM}■ ${g.group}/  (${g.baseKeyCount} keys chuẩn từ ${BASE_LOCALE})${RESET}`);
  for (const l of g.locales) {
    if (l.error) {
      console.log(`  ${RED}✗ ${l.locale}: ${l.error}${RESET}`);
      continue;
    }
    if (!l.missing.length && !l.extra.length) {
      console.log(`  ${GREEN}✓ ${l.locale}${RESET} ${DIM}(${l.keyCount} keys)${RESET}`);
    } else {
      console.log(`  ${RED}✗ ${l.locale}${RESET} ${DIM}(${l.keyCount} keys)${RESET}`);
      if (l.missing.length)
        console.log(`      ${YELLOW}thiếu (${l.missing.length}):${RESET} ${l.missing.join(", ")}`);
      if (l.extra.length)
        console.log(`      ${YELLOW}thừa  (${l.extra.length}):${RESET} ${l.extra.join(", ")}`);
    }
  }
  console.log("");
}

if (report.ok) {
  console.log(`${GREEN}✓ Tất cả ngôn ngữ đồng bộ key.${RESET}\n`);
  process.exit(0);
} else {
  console.log(`${RED}✗ Phát hiện lệch key. Chạy i18n Sync Agent (/i18n-sync) để đồng bộ.${RESET}\n`);
  process.exit(1);
}
