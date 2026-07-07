import type { NextRequest } from "next/server";

export interface GeoData {
  country_code: string | null;
  country_name: string | null;
  region: string | null;
  city: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  geo_timezone: string | null;
  isp: string | null;
  org: string | null;
  is_proxy: boolean;
  is_hosting: boolean;
  geo_source: string | null;
}

export interface ParsedUserAgent {
  browser_name: string | null;
  browser_version: string | null;
  os_name: string | null;
  os_version: string | null;
  device_type: string | null;
}

export function getClientIp(request: NextRequest): {
  ip: string | null;
  version: string | null;
} {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnecting = request.headers.get("cf-connecting-ip");
  const vercelIp = request.headers.get("x-vercel-forwarded-for");

  const raw =
    cfConnecting?.split(",")[0]?.trim() ||
    vercelIp?.split(",")[0]?.trim() ||
    forwarded?.split(",")[0]?.trim() ||
    realIp?.trim() ||
    null;

  if (!raw) return { ip: null, version: null };

  const version = raw.includes(":") ? "6" : "4";
  return { ip: raw, version };
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) ||
    ip.startsWith("fc") ||
    ip.startsWith("fd") ||
    ip.startsWith("fe80")
  );
}

export function parseUserAgent(ua: string | null): ParsedUserAgent {
  if (!ua) {
    return {
      browser_name: null,
      browser_version: null,
      os_name: null,
      os_version: null,
      device_type: null,
    };
  }

  let browser_name: string | null = null;
  let browser_version: string | null = null;
  let os_name: string | null = null;
  let os_version: string | null = null;
  let device_type: string | null = "desktop";

  if (/Mobile|Android|iPhone|iPad|iPod/i.test(ua)) {
    device_type = /iPad|Tablet/i.test(ua) ? "tablet" : "mobile";
  }

  const browserMatchers: [RegExp, string][] = [
    [/Edg\/([\d.]+)/, "Edge"],
    [/OPR\/([\d.]+)/, "Opera"],
    [/Chrome\/([\d.]+)/, "Chrome"],
    [/Firefox\/([\d.]+)/, "Firefox"],
    [/Version\/([\d.]+).*Safari/, "Safari"],
  ];

  for (const [regex, name] of browserMatchers) {
    const match = ua.match(regex);
    if (match) {
      browser_name = name;
      browser_version = match[1] ?? null;
      break;
    }
  }

  const osMatchers: [RegExp, string, number?][] = [
    [/Windows NT ([\d.]+)/, "Windows", 1],
    [/Mac OS X ([\d_]+)/, "macOS", 1],
    [/Android ([\d.]+)/, "Android", 1],
    [/iPhone OS ([\d_]+)/, "iOS", 1],
    [/iPad; CPU OS ([\d_]+)/, "iPadOS", 1],
    [/Linux/, "Linux"],
  ];

  for (const [regex, name, group] of osMatchers) {
    const match = ua.match(regex);
    if (match) {
      os_name = name;
      os_version = group ? match[group]?.replace(/_/g, ".") ?? null : null;
      break;
    }
  }

  return { browser_name, browser_version, os_name, os_version, device_type };
}

function geoFromHeaders(request: NextRequest): GeoData | null {
  const vercelCountry = request.headers.get("x-vercel-ip-country");
  if (vercelCountry) {
    return {
      country_code: vercelCountry,
      country_name: null,
      region: request.headers.get("x-vercel-ip-country-region"),
      city: request.headers.get("x-vercel-ip-city"),
      postal_code: null,
      latitude: parseFloat(request.headers.get("x-vercel-ip-latitude") || "") || null,
      longitude: parseFloat(request.headers.get("x-vercel-ip-longitude") || "") || null,
      geo_timezone: request.headers.get("x-vercel-ip-timezone"),
      isp: null,
      org: null,
      is_proxy: false,
      is_hosting: false,
      geo_source: "vercel",
    };
  }

  const cfCountry = request.headers.get("cf-ipcountry");
  if (cfCountry && cfCountry !== "XX") {
    return {
      country_code: cfCountry,
      country_name: null,
      region: null,
      city: null,
      postal_code: null,
      latitude: null,
      longitude: null,
      geo_timezone: null,
      isp: null,
      org: null,
      is_proxy: false,
      is_hosting: false,
      geo_source: "cloudflare",
    };
  }

  return null;
}

interface IpApiResponse {
  status?: string;
  country?: string;
  countryCode?: string;
  regionName?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  proxy?: boolean;
  hosting?: boolean;
}

async function geoFromIpApi(ip: string): Promise<GeoData | null> {
  try {
    const fields =
      "status,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,proxy,hosting";
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=${fields}`,
      { signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as IpApiResponse;
    if (data.status !== "success") return null;

    return {
      country_code: data.countryCode ?? null,
      country_name: data.country ?? null,
      region: data.regionName ?? null,
      city: data.city ?? null,
      postal_code: data.zip ?? null,
      latitude: data.lat ?? null,
      longitude: data.lon ?? null,
      geo_timezone: data.timezone ?? null,
      isp: data.isp ?? null,
      org: data.org ?? null,
      is_proxy: data.proxy ?? false,
      is_hosting: data.hosting ?? false,
      geo_source: "ip-api",
    };
  } catch {
    return null;
  }
}

export async function resolveGeo(
  request: NextRequest,
  ip: string | null
): Promise<GeoData> {
  const empty: GeoData = {
    country_code: null,
    country_name: null,
    region: null,
    city: null,
    postal_code: null,
    latitude: null,
    longitude: null,
    geo_timezone: null,
    isp: null,
    org: null,
    is_proxy: false,
    is_hosting: false,
    geo_source: null,
  };

  const fromHeaders = geoFromHeaders(request);
  if (fromHeaders) return fromHeaders;

  if (!ip || isPrivateIp(ip)) return empty;

  return (await geoFromIpApi(ip)) ?? empty;
}

export function extractReferrerDomain(referer: string | null): string | null {
  if (!referer) return null;
  try {
    return new URL(referer).hostname;
  } catch {
    return null;
  }
}

export function toInt(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : null;
}

export function toNullableString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  return s || null;
}
