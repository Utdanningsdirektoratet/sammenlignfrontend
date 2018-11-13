export function parseUrl(url?: string) {
  if (url) {
    const hashIndex = url.lastIndexOf("#");
    if (hashIndex !== -1) {
      const hash = url.substr(hashIndex + 1);
      if (hash) return hash.split(",");
    }
  }
  return [];
}
export function getUrlState() {
  return parseUrl(window.location.hash);
}
export function setUrlState(state: string[]) {
  if (!window.location.hash && state.length === 0) {
    return;
  }
  window.location.replace("#" + state.join(","));
}
