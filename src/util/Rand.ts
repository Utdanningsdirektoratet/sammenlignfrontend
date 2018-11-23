export function randId(number: number = 10) {
  let rands = "";
  for (var i = 0; i < number; i++) {
    rands += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }
  return rands;
}
