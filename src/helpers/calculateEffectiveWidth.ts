export function calculateEffectiveWidth(
  originalWidth: number,
  cellHeight: number,
  skewDegrees: number
): number {
  const skewRadians = (skewDegrees * Math.PI) / 180;
  const shift = Math.tan(skewRadians) * cellHeight;
  return originalWidth + shift;
}
