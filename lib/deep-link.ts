import { site } from "./site";

export function appHref(path = "") {
  const clean = path.replace(/^\/+/, "");
  return clean ? `${site.scheme}://${clean}` : `${site.scheme}://`;
}

export function joinAppHref(vendorId: string) {
  return `${site.scheme}://join?v=${encodeURIComponent(vendorId)}`;
}

export function identifyAppHref(vendorId: string, token: string) {
  const params = new URLSearchParams({ v: vendorId, t: token });
  return `${site.scheme}://identify?${params.toString()}`;
}

export function authAppHref() {
  return `${site.scheme}://auth`;
}
