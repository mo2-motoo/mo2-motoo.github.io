# Motoo 프로젝트 문서화 사이트

![Motoo Logo](https://img.shields.io/badge/Motoo-Documentation-blue?style=for-the-badge&logo=rocket)

Motoo 프로젝트의 완전한 문서화 사이트입니다. 이 사이트는 GitHub Pages를 활용하여 프로젝트의 아키텍처, 구현 방식, 테스트 전략, 그리고 문제 해결 방법을 포함한 종합적인 가이드를 제공합니다.

## 🚀 사이트 특징

- **📚 종합적인 문서화**: 아키텍처부터 구현까지 모든 단계를 상세히 설명
- **🎨 모던한 디자인**: 우아한형제들과 Toss의 Tech Blog 스타일을 참고한 깔끔한 UI
- **📱 반응형 디자인**: 모든 디바이스에서 최적화된 경험 제공
- **🔍 직관적인 네비게이션**: 체계적으로 구성된 사이드바와 검색 기능
- **⚡ 빠른 로딩**: 최적화된 성능으로 빠른 페이지 로딩

## 📋 목차

### 🏗️ 아키텍처
- [개요](architecture/overview.html) - 시스템 전체 구조와 설계 원칙
- [시스템 아키텍처](architecture/system-architecture.html) - 상세한 시스템 구성
- [데이터베이스 ERD](architecture/database-erd.html) - 데이터베이스 설계
- [기술 스택](architecture/tech-stack.html) - 사용된 기술과 도구

### 🎯 도메인 설명
- [개요](domain/overview.html) - 핵심 비즈니스 도메인
- [사용자 관리](domain/user.html) - 사용자 관련 기능
- [종목 관리](domain/stock.html) - 주식 종목 정보
- [주문 처리](domain/order.html) - 매수/매도 주문
- [포트폴리오](domain/portfolio.html) - 자산 관리
- [거래내역](domain/transaction.html) - 거래 기록
- [토큰 관리](domain/token.html) - 인증 및 권한
- [체결 처리](domain/execution.html) - 주문 체결

### 💻 구현 방식
- [개요](implementation/overview.html) - 구현 전략
- [사용자 서비스](implementation/user-service.html) - 사용자 관리 구현
- [종목 서비스](implementation/stock-service.html) - 종목 관리 구현
- [주문 서비스](implementation/order-service.html) - 주문 처리 구현
- [포트폴리오 서비스](implementation/portfolio-service.html) - 포트폴리오 구현
- [거래내역 서비스](implementation/transaction-service.html) - 거래내역 구현
- [토큰 서비스](implementation/token-service.html) - 토큰 관리 구현
- [체결 서비스](implementation/execution-service.html) - 체결 처리 구현

### 🧪 테스트
- [개요](testing/overview.html) - 테스트 전략
- [단위 테스트](testing/unit-tests.html) - 단위 테스트 방법
- [통합 테스트](testing/integration-tests.html) - 통합 테스트 방법
- [E2E 테스트](testing/e2e-tests.html) - E2E 테스트 방법
- [테스트 전략](testing/strategy.html) - 전체 테스트 전략
- [테스트 커버리지](testing/coverage.html) - 커버리지 관리

### 🚨 문제 해결
- [개요](troubleshooting/overview.html) - 문제 해결 가이드
- [성능 최적화](troubleshooting/performance-issues.html) - 성능 문제 해결
- [데이터베이스 문제](troubleshooting/database-problems.html) - DB 문제 해결
- [서버 장애 대응](troubleshooting/server-issues.html) - 서버 문제 해결
- [알려진 버그](troubleshooting/known-bugs.html) - 알려진 이슈
- [장애 대응 절차](troubleshooting/incident-response.html) - 장애 대응

### 📈 부하 테스트
- [개요](load-testing/overview.html) - 부하 테스트 개요
- [테스트 시나리오](load-testing/scenarios.html) - 테스트 시나리오
- [테스트 결과](load-testing/results.html) - 테스트 결과 분석
- [테스트 도구 설정](load-testing/tools-setup.html) - 도구 설정
- [성능 모니터링](load-testing/monitoring.html) - 모니터링 방법
- [성능 목표](load-testing/performance-goals.html) - 성능 목표

### 🔗 빠른 링크
- [개요](quick-links/overview.html) - 빠른 링크 모음
- [시작하기](quick-links/getting-started.html) - 프로젝트 시작 가이드
- [FAQ](quick-links/faq.html) - 자주 묻는 질문
- [변경 사항](quick-links/changelog.html) - 업데이트 내역

### 📞 문의
- [개요](contact/overview.html) - 문의 안내
- [개발팀 연락처](contact/development-team.html) - 팀 연락처
- [지원 요청](contact/support-request.html) - 지원 요청

## 🛠️ 기술 스택

### Frontend
- **HTML5** - 시맨틱 마크업
- **CSS3** - 모던 스타일링 (Flexbox, Grid, CSS Variables)
- **JavaScript (ES6+)** - 인터랙티브 기능
- **Font Awesome** - 아이콘 라이브러리
- **Google Fonts** - Inter 폰트

### Backend (문서화 대상)
- **Spring Boot** - REST API 서버
- **Java 17** - 프로그래밍 언어
- **PostgreSQL** - 메인 데이터베이스
- **Redis** - 캐싱 및 세션
- **Docker** - 컨테이너화

## 🚀 로컬 개발

### 필수 요구사항
- 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 로컬 웹 서버 (선택사항)

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-org/mo2-motoo.github.io.git
   cd mo2-motoo.github.io
   ```

2. **로컬 서버 실행 (선택사항)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:8000
   ```

## 📁 프로젝트 구조

```
mo2-motoo.github.io/
├── index.html                 # 메인 페이지
├── assets/                    # 정적 리소스
│   ├── css/                   # 스타일시트
│   │   ├── style.css         # 메인 스타일
│   │   └── sidebar.css       # 사이드바 스타일
│   └── js/                    # JavaScript
│       └── main.js           # 메인 스크립트
├── architecture/              # 아키텍처 문서
├── domain/                    # 도메인 설명
├── implementation/            # 구현 방식
├── testing/                   # 테스트 문서
├── troubleshooting/           # 문제 해결
├── load-testing/              # 부하 테스트
├── quick-links/               # 빠른 링크
├── contact/                   # 문의
└── README.md                  # 프로젝트 설명
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#667eea` (파란색 계열)
- **Secondary**: `#764ba2` (보라색 계열)
- **Accent**: `#f093fb` (핑크 계열)
- **Background**: `#f8fafc` (연한 회색)
- **Text**: `#1a202c` (진한 회색)

### 타이포그래피
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Base Size**: 16px
- **Line Height**: 1.6

### 컴포넌트
- **Cards**: 둥근 모서리, 그림자 효과
- **Buttons**: 그라데이션 배경, 호버 효과
- **Navigation**: 고정 사이드바, 반응형 메뉴
- **Icons**: Font Awesome 아이콘

## 🔧 커스터마이징

### 새로운 페이지 추가
1. 해당 섹션 디렉토리에 HTML 파일 생성
2. 사이드바 네비게이션에 링크 추가
3. 필요한 CSS 스타일 추가

### 스타일 수정
- `assets/css/style.css` - 메인 스타일
- `assets/css/sidebar.css` - 사이드바 스타일

### 기능 추가
- `assets/js/main.js` - JavaScript 기능

## 📝 기여하기

1. **Fork** 저장소
2. **Feature branch** 생성 (`git checkout -b feature/AmazingFeature`)
3. **Commit** 변경사항 (`git commit -m 'Add some AmazingFeature'`)
4. **Push** 브랜치 (`git push origin feature/AmazingFeature`)
5. **Pull Request** 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

- **프로젝트 관리자**: [이메일 주소]
- **개발팀**: [팀 이메일]
- **문서 관련 문의**: [문서팀 이메일]

## 🙏 감사의 말

- [우아한형제들 Tech Blog](https://techblog.woowahan.com/) - 디자인 영감
- [Toss Tech Blog](https://toss.tech/) - UI/UX 참고
- [Font Awesome](https://fontawesome.com/) - 아이콘 제공
- [Google Fonts](https://fonts.google.com/) - 폰트 제공

---

**Motoo 프로젝트 문서화 사이트** - 프로젝트의 모든 것을 한 곳에서 확인하세요! 🚀
