export function getTimeString(time: Date = new Date()): string {
  const isoString = time.toISOString().replace(/[:-]/g, '');
  return isoString.slice(0, 8) + '_' + isoString.slice(9, 15);
}
