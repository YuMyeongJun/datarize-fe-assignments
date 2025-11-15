# 문서 목록

이 폴더에는 프로젝트 개발에 관련된 참고 문서들이 포함되어 있습니다.

> **⚠️ 중요**: Cursor가 자동으로 읽는 규칙 파일들은 `.cursor/rules/` 폴더로 이동했습니다.
>
> - `.cursor/rules/rules.md`: 핵심 개발 룰
> - `.cursor/rules/development-rules.md`: 상세한 개발 룰 및 요구사항 명세서
> - `.cursor/rules/agent-prompt.md`: 단계별 개발 가이드 및 구현 예시

## 📚 문서 목록

### 개발 가이드 (참고용)

> **참고**: Cursor가 자동으로 읽는 규칙 파일들은 `.cursor/rules/` 폴더에 있습니다.
>
> - `.cursor/rules/rules.md`: 핵심 개발 룰
> - `.cursor/rules/development-rules.md`: 상세한 개발 룰 및 요구사항 명세서
> - `.cursor/rules/agent-prompt.md`: 단계별 개발 가이드 및 구현 예시

- **[DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)**: 개발 계획서
  - 6단계 개발 프로세스
  - 단계별 작업 내용
  - 예상 소요 시간
  - 체크리스트

### 기술 문서

- **[TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md)**: 기술 스택 및 아키텍처 결정 사항

  - 각 라이브러리 선택 이유
  - 사용 패턴 및 코드 예시
  - 장단점 분석
  - 트레이드오프 분석
  - 실제 프로젝트 적용 사례
  - 학습한 교훈

- **[TECH_STACK.md](./TECH_STACK.md)**: 기술 스택 설치 가이드
  - 필수 라이브러리 설치 명령어
  - 라이브러리별 용도
  - 프로젝트 구조 참고

### 검증 문서

- **[REQUIREMENTS_CHECKLIST.md](./REQUIREMENTS_CHECKLIST.md)**: 요구사항 체크리스트

  - 구현 완료된 기능 목록
  - 구현 상세
  - 요구사항 충족도
  - 개선 사항

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)**: 구현 요약 및 충족도
  - 요구사항별 구현 내용
  - 전체 요구사항 충족도
  - 테스트 코드 작성 현황

## 📖 읽는 순서 추천

1. **처음 시작하는 경우 (Cursor AI 사용)**

   - `.cursor/rules/rules.md` → `.cursor/rules/development-rules.md` → `.cursor/rules/agent-prompt.md`

2. **처음 시작하는 경우 (수동 참조)**

   - `.cursor/rules/development-rules.md` → `.cursor/rules/agent-prompt.md` → `DEVELOPMENT_PLAN.md`

3. **기술 스택 이해가 필요한 경우**

   - `TECH_STACK.md` → `TECHNICAL_DECISIONS.md`

4. **요구사항 확인이 필요한 경우**

   - `REQUIREMENTS_CHECKLIST.md` → `IMPLEMENTATION_SUMMARY.md`

5. **전체적인 이해**
   - 루트의 `README.md` → `.cursor/rules/` 폴더의 규칙 파일들 → 이 문서의 참고 문서들
