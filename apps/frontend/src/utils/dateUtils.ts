import dayjs from 'dayjs';

/**
 * 날짜를 ISO 8601 형식으로 변환
 */
export const formatToISO8601 = (date: Date | string): string => {
  return dayjs(date).toISOString();
};

/**
 * 날짜 범위 유효성 검사
 */
export const isValidDateRange = (from: Date | string, to: Date | string): boolean => {
  return dayjs(from).isBefore(dayjs(to)) || dayjs(from).isSame(dayjs(to));
};

/**
 * 날짜 포맷팅 (표시용)
 */
export const formatDate = (date: Date | string, format: string = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(format);
};

