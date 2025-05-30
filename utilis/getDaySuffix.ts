export function getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'; // Handle teens
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
