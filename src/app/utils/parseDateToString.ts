export const parseDateToString = (date: number) => {
  return new Date(date).toISOString().split("T")[0]; // Extracts 'YYYY-MM-DD'
};

export const parseDateToReadableString = (date: number) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};
