import { getDaySuffix } from './getDaySuffix';

export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day}${getDaySuffix(day)} ${month} ${year}`;
}
