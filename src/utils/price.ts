/**
 * 숫자를 한국 Locale 형식의 문자열로 변환합니다.
 * ex) 120000 -> 120,000
 */
export const formatPrice = (value: number | undefined): string => {
  if (value === undefined || value === null || value === 0) return "";
  return value.toLocaleString("ko-KR");
};

/**
 * 문자열에서 숫자만 추출하여 Number로 변환합니다.
 */
export const parsePrice = (value: string): number | undefined => {
  const digits = value.replace(/[^\d]/g, "");
  if (digits === "") return undefined;
  // 최대 12자리 제한
  if (digits.length > 12) return Number(digits.slice(0, 12));
  return Number(digits);
};
