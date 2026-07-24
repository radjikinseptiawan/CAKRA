export const convertDate = (date: Date) => {
  return Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    year: "numeric",
    month: "short",
  }).format(date);
};

export const statusSelection = (val: string) => {
  if (val == "CONFIRMED") {
    return "success";
  } else if (val == "REJECTED") {
    return "error";
  }
  return "default";
};
