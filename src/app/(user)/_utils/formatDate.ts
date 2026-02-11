export const formatDate = (rawDate?: string) => {
  if (!rawDate) return "";

  const date = new Date(rawDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month}.${day}`;
};
