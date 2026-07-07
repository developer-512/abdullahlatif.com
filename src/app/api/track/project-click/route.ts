import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import {
  extractReferrerDomain,
  getClientIp,
  parseUserAgent,
  resolveGeo,
  toInt,
  toNullableString,
} from "@/lib/tracking";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const projectId = toNullableString(body.project_id);
    const destinationUrl = toNullableString(body.destination_url);

    if (!projectId || !destinationUrl) {
      return NextResponse.json(
        { error: "project_id and destination_url are required" },
        { status: 400 }
      );
    }

    const sb = getAdminClient();
    const { data: project } = await sb
      .from("projects")
      .select("id, title, link")
      .eq("id", projectId)
      .single();

    if (!project?.link) {
      return NextResponse.json({ error: "Invalid project" }, { status: 404 });
    }

    const { ip, version } = getClientIp(request);
    const userAgent = request.headers.get("user-agent");
    const referer =
      toNullableString(body.page_url) || request.headers.get("referer");
    const acceptLanguage = request.headers.get("accept-language");
    const parsedUa = parseUserAgent(userAgent);
    const geo = await resolveGeo(request, ip);

    const { error } = await sb.from("project_link_clicks").insert({
      project_id: projectId,
      project_title:
        toNullableString(body.project_title) || project.title || null,
      destination_url: destinationUrl,
      ip_address: ip,
      ip_version: version,
      user_agent: userAgent,
      referer,
      referrer_domain: extractReferrerDomain(referer),
      accept_language: acceptLanguage,
      browser_name: parsedUa.browser_name,
      browser_version: parsedUa.browser_version,
      os_name: parsedUa.os_name,
      os_version: parsedUa.os_version,
      device_type: parsedUa.device_type,
      screen_width: toInt(body.screen_width),
      screen_height: toInt(body.screen_height),
      viewport_width: toInt(body.viewport_width),
      viewport_height: toInt(body.viewport_height),
      client_timezone: toNullableString(body.client_timezone),
      client_language: toNullableString(body.client_language),
      country_code: geo.country_code,
      country_name: geo.country_name,
      region: geo.region,
      city: geo.city,
      postal_code: geo.postal_code,
      latitude: geo.latitude,
      longitude: geo.longitude,
      geo_timezone: geo.geo_timezone,
      isp: geo.isp,
      org: geo.org,
      is_proxy: geo.is_proxy,
      is_hosting: geo.is_hosting,
      geo_source: geo.geo_source,
      session_id: toNullableString(body.session_id),
      utm_source: toNullableString(body.utm_source),
      utm_medium: toNullableString(body.utm_medium),
      utm_campaign: toNullableString(body.utm_campaign),
      utm_term: toNullableString(body.utm_term),
      utm_content: toNullableString(body.utm_content),
    });

    if (error) {
      console.error("Click tracking insert failed:", error.message);
      return NextResponse.json({ error: "Failed to record click" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
