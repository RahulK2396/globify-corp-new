export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function findField(
  fields: Record<string, unknown>,
  keys: string[],
): string {
  for (const k of keys) {
    for (const [fk, fv] of Object.entries(fields)) {
      if (
        fk.toLowerCase().includes(k.toLowerCase()) &&
        fv &&
        String(fv).trim()
      ) {
        return String(fv).trim();
      }
    }
  }
  return "";
}
