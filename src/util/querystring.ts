import { getLang } from "../components/app/Translate";

export type QueryObject = { [a: string]: string };

export function objectToQueryString(obj?: QueryObject) {
  const params: QueryObject = {
    ...obj,
    spraak: getLang(),
    origin: window.location.origin,
  };

  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
}
// Due to strange cors config on the server, we need a site unique urls per host
// so that both udir.ivarne.com and localhost:3000 can work at the saame time
// This wil ensure that Allow-Origin gets cached differently.
const CORS_HACK = "origin=" + encodeURIComponent(window.location.origin);
