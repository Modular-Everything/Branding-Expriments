export function calculateMaxSkew(
  originalWidth: number,
  cellHeight: number
): number {
  return Math.atan(originalWidth / cellHeight) * (180 / Math.PI);
}
