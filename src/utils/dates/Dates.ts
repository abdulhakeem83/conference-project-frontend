export const shortDateFormat = (startDate: string) =>
  `${new Date(startDate).getDate().toFixed(0)}${" "}`;
export const filterMonthByDate = (date: string) =>
  new Date(String(date)).toLocaleString("default", {
    month: "short",
  });
