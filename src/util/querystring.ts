export function objectToQueryString(obj?: { [k: string]: string }) {
  if (!obj) return "";
  return Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join("&");
}
