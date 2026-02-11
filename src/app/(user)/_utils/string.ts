export const extractStatus = (text: string) => {
  if (text.includes("승인")) return "승인";
  if (text.includes("거절")) return "거절";
  return "알 수 없음";
};
