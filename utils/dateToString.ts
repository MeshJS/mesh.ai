const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function dateToString(dateStr) {
  const d = new Date(dateStr);
  let result = `${month[d.getMonth()]}. ${d.getDate()}, ${d.getFullYear()}`;
  return result;
}
