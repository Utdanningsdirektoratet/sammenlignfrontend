export function objectToQueryString(obj?: { [k: string]: string }) {
  if (!obj || Object.keys(obj).length === 0) return CORS_HACK;
  return (
    CORS_HACK +
    "& " +
    Object.keys(obj)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
      .join("&")
  );
}
// Due to strange cors config on the server, we need a site unique urls per host
// so that both udir.ivarne.com and localhost:3000 can work at the saame time
// This wil ensure that Allow-Origin gets cached differently.
const CORS_HACK = "origin=" + encodeURIComponent(window.location.origin);
