// export const API_DOMAIN = "https://cors-hack-sammenligning.azurewebsites.net";
export const API_DOMAIN = (() => {
  if ((window as any).sammenlignBackendURL) {
    return (window as any).sammenlignBackendURL as string;
  }
  return "https://sammenlign.utdanning.no";
})();

export const NUM_COMPARES_MOBILE = 2;
export const NUM_COMPARES_DESKTOP = 5;
