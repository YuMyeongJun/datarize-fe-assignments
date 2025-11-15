/**
 * API 에러 처리 유틸리티
 */

export interface IApiError {
  message: string;
  status?: number;
}

/**
 * API 응답 에러 처리
 */
export const handleApiError = (error: unknown): IApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }
  
  return {
    message: '알 수 없는 오류가 발생했습니다.',
  };
};

