export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function isEventOnDay(
  event: { start: string; end: string },
  year: number,
  month: number,
  day: number,
): boolean {
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);

  const cellDate = new Date(year, month, day);
  const startDate = new Date(
    eventStart.getFullYear(),
    eventStart.getMonth(),
    eventStart.getDate(),
  );
  const endDate = new Date(
    eventEnd.getFullYear(),
    eventEnd.getMonth(),
    eventEnd.getDate(),
  );

  return cellDate >= startDate && cellDate <= endDate;
}
