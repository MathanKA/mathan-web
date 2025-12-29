import type { Locale } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

const enUSNoAbout: Locale = {
  ...enUS,
  formatDistance: (...args: Parameters<Locale["formatDistance"]>) => {
    const s = enUS.formatDistance(...args);
    return s.replace(/^about\s+/, "");
  }
};

export function formatRelativeTime(date: Date | string | number) {
  if (!date) return null;
  try {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: enUSNoAbout
    });
  } catch {
    return null;
  }
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
) {
  const { timeout = 10000, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
