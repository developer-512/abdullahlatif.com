"use client";

export interface TrackProjectClickPayload {
  project_id: string;
  project_title: string;
  destination_url: string;
}

function getSessionId(): string {
  const key = "portfolio_session_id";
  try {
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

function getUtmParams(): Record<string, string | null> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
  };
}

export function trackProjectClick(payload: TrackProjectClickPayload): void {
  const body = JSON.stringify({
    ...payload,
    session_id: getSessionId(),
    screen_width: window.screen?.width ?? null,
    screen_height: window.screen?.height ?? null,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    client_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    client_language: navigator.language,
    page_url: window.location.href,
    ...getUtmParams(),
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/track/project-click", blob);
    return;
  }

  fetch("/api/track/project-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}
