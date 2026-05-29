export function dateToLocalString(inputDate: Date) {
  return inputDate.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
