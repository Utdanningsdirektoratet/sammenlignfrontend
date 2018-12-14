export function isIE() {
  var ua = window.navigator.userAgent;
  if (
    ua.indexOf("MSIE ") > -1 ||
    ua.indexOf("Trident/") > -1 ||
    ua.indexOf("Edge/") > -1
  )
    return true;
  return false;
}
