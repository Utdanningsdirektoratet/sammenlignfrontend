export function getNumberWithProperSpacing(
  value: string | number | null
): string | null {
  if (value === null) return value;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
