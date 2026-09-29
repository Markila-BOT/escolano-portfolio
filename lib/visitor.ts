const VISIT_ID_KEY = "v-id";
const VISIT_FIRST_KEY = "v-first";
const VISIT_COUNT_KEY = "v-count";
const VISIT_LAST_KEY = "v-last";
const VISIT_SESSION_KEY = "v-session";
const RETURNING_VISIT_GAP_MS = 30 * 60 * 1000;
const VISIT_COOKIE_MAX_AGE_MS = 63_072_000_000;
const ANALYTICS_DELAY_MS = 90_000;

export type DeviceVisit = {
  visitorId: string;
  visitCount: number;
  firstSeen: string;
  lastSeen: string;
  isNewVisit: boolean;
  startedAt: number;
};

let cachedVisit: DeviceVisit | null = null;
let analyticsSent = false;

function readStored(key: string) {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored) return stored;
  } catch {
    return readCookie(key);
  }

  return readCookie(key);
}

function writeStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private mode can block storage. The cookie still keeps the device id.
  }

  writeCookie(key, value);
}

function readCookie(key: string) {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));
    return match?.[1] ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

function writeCookie(key: string, value: string) {
  try {
    const expires = new Date(
      Date.now() + VISIT_COOKIE_MAX_AGE_MS,
    ).toUTCString();
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
  } catch {
    // A blocked cookie still leaves the localStorage copy when that write succeeded.
  }
}

function createVisitorId() {
  try {
    if (crypto.randomUUID) return crypto.randomUUID();
  } catch {
    // Fall through to the timestamp id.
  }

  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
}

function readDevice() {
  const userAgent = navigator.userAgent || "";
  const isTablet =
    /iPad|Tablet|PlayBook|Silk/i.test(userAgent) ||
    (/Android/i.test(userAgent) && !/Mobile/i.test(userAgent));
  const isMobile = /Mobi|iPhone|iPod|Android.*Mobile|Windows Phone/i.test(
    userAgent,
  );

  let browser = "Unknown";
  if (/Edg\//i.test(userAgent)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(userAgent)) browser = "Opera";
  else if (/Chrome\//i.test(userAgent) && !/Chromium/i.test(userAgent)) {
    browser = "Chrome";
  } else if (/Firefox\//i.test(userAgent)) browser = "Firefox";
  else if (/Safari\//i.test(userAgent) && !/Chrome/i.test(userAgent)) {
    browser = "Safari";
  }

  let os = "Unknown";
  if (/Windows/i.test(userAgent)) os = "Windows";
  else if (/Android/i.test(userAgent)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(userAgent)) os = "iOS";
  else if (/Mac OS X/i.test(userAgent)) os = "macOS";
  else if (/Linux/i.test(userAgent)) os = "Linux";

  const type = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  return {
    type,
    browser,
    os,
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
  };
}

/**
 * A visit is new when this tab has not already counted it and the last visit
 * on this device was at least 30 minutes ago. A refresh in the same tab, or a
 * return inside that window, keeps the current count.
 */
function recordVisit(): DeviceVisit {
  const now = new Date().toISOString();
  let visitorId = readStored(VISIT_ID_KEY) ?? "";
  let firstSeen = readStored(VISIT_FIRST_KEY) ?? "";
  const lastSeen = readStored(VISIT_LAST_KEY) ?? "";
  let visitCount = Number.parseInt(readStored(VISIT_COUNT_KEY) ?? "0", 10);

  if (!Number.isFinite(visitCount) || visitCount < 0) visitCount = 0;

  if (!visitorId) {
    visitorId = createVisitorId();
    firstSeen = now;
  }

  let isSameSession = false;
  try {
    isSameSession =
      window.sessionStorage.getItem(VISIT_SESSION_KEY) === visitorId;
  } catch {
    isSameSession = false;
  }

  const elapsed = lastSeen ? Date.now() - Date.parse(lastSeen) : Number.NaN;
  const isContinuing =
    Number.isFinite(elapsed) &&
    elapsed >= 0 &&
    elapsed < RETURNING_VISIT_GAP_MS;
  const isNewVisit = !isSameSession && !isContinuing;

  if (isNewVisit) visitCount += 1;

  try {
    window.sessionStorage.setItem(VISIT_SESSION_KEY, visitorId);
  } catch {
    // The 30-minute gap still separates visits when session storage is blocked.
  }

  writeStored(VISIT_ID_KEY, visitorId);
  writeStored(VISIT_FIRST_KEY, firstSeen);
  writeStored(VISIT_COUNT_KEY, String(visitCount));
  writeStored(VISIT_LAST_KEY, now);

  return {
    visitorId,
    visitCount,
    firstSeen,
    lastSeen,
    isNewVisit,
    startedAt: Date.now(),
  };
}

export function readDeviceVisit() {
  if (cachedVisit) return cachedVisit;

  try {
    cachedVisit = recordVisit();
    return cachedVisit;
  } catch {
    return null;
  }
}

function readVisitPayload(visit: DeviceVisit) {
  const params = new URLSearchParams(window.location.search);
  const device = readDevice();
  let timezone = "";

  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    timezone = "";
  }

  return {
    type: "visitor",
    localTime: new Date().toString(),
    visitorId: visit.visitorId,
    visitCount: String(visit.visitCount),
    firstSeen: visit.firstSeen,
    lastSeen: visit.lastSeen,
    isNewVisit: visit.isNewVisit ? "Yes" : "No",
    landingPage: `${window.location.pathname}${window.location.hash}`,
    exitPage: `${window.location.pathname}${window.location.hash}`,
    entryUrl: window.location.href,
    referrer: document.referrer || "Direct",
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    timeOnPage: String(Math.round((Date.now() - visit.startedAt) / 1000)),
    device: device.type,
    browser: device.browser,
    os: device.os,
    screen: device.screen,
    language: navigator.language || "",
    timezone,
  };
}

export function scheduleVisitAnalytics(visit: DeviceVisit) {
  const analyticsUrl = process.env.NEXT_PUBLIC_ANALYTICS_URL?.trim() ?? "";
  if (!analyticsUrl) return () => undefined;

  const send = () => {
    if (analyticsSent) return;
    analyticsSent = true;

    const body = new URLSearchParams(readVisitPayload(visit));

    try {
      if (navigator.sendBeacon?.(analyticsUrl, body)) return;
    } catch {
      // Fall through to fetch when the beacon throws.
    }

    void fetch(analyticsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      keepalive: true,
    }).catch(() => undefined);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") send();
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", send);
  const timer = window.setTimeout(send, ANALYTICS_DELAY_MS);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("pagehide", send);
    window.clearTimeout(timer);
  };
}
