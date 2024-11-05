export const parseDateToString = (date: number) => {
  return new Date(date).toISOString().split("T")[0]; // Extracts 'YYYY-MM-DD'
};
