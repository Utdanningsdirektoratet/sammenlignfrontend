export function getUrlState() {
  let hash = window.location.hash;
  if (hash[0] === "#") hash = hash.substr(1);
  if (hash) return window.location.hash.split(",");
  return [];
}

export function toggleUrlState(key) {
  const state = getUrlState();
  let newState;
  if (state.indexOf(key) !== -1) {
    newState = state.filter(v => v !== key);
  } else {
    newState = [...state, key];
  }
  window.location.hash = newState.join(",");
  return newState;
}
