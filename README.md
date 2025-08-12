# Motoo 프로젝트 문서화 사이트

![Motoo Logo](https://img.shields.io/badge/Motoo-Documentation-blue?style=for-the-badge&logo=rocket)

Motoo 프로젝트의 문서화 사이트입니다. Jekyll 기반으로 마크다운으로 포스팅할 수 있습니다.

## 🚀 사이트 URL

**https://mo2-motoo.github.io/mo2-motoo.github.io/**

## 📝 마크다운 포스팅 가이드

### 1. 새 포스트 작성하기

#### GitHub에서 직접 작성

1. `_posts/` 폴더로 이동
2. "Add file" → "Create new file" 클릭
3. 파일명: `YYYY-MM-DD-제목.md` 형식으로 작성
4. Front Matter와 마크다운 내용 작성
5. "Commit new file" 클릭

#### 로컬에서 작성

1. `_posts/` 폴더에 마크다운 파일 생성
2. Git으로 커밋 및 푸시

### 2. Front Matter 작성법

```markdown
---
layout: post
title: "포스트 제목"
date: 2024-01-15
categories: [architecture]
tags: [tag1, tag2]
author: "작성자명"
description: "포스트 설명"
---
```

#### Front Matter 옵션

- `layout`: `post` (고정)
- `title`: 포스트 제목
- `date`: 작성일 (YYYY-MM-DD 형식)
- `categories`: 카테고리 배열 (architecture, domain, implementation, testing, troubleshooting, load-testing, quick-links, contact 중 선택)
- `tags`: 태그 배열 (자유롭게 작성)
- `author`: 작성자명
- `description`: 포스트 설명 (선택사항)

### 3. 카테고리 목록

- **architecture**: 아키텍처 관련
- **domain**: 도메인 설명
- **implementation**: 구현 방식
- **testing**: 테스트 관련
- **troubleshooting**: 문제 해결
- **load-testing**: 부하 테스트
- **quick-links**: 빠른 링크
- **contact**: 문의 관련

### 4. 마크다운 작성 팁

#### 제목

```markdown
# 제목 1

## 제목 2

### 제목 3
```

#### 강조

```markdown
**굵게**
_기울임_
`코드`
```

#### 코드 블록

````markdown
```java
public class Example {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```
````

````

#### 링크
```markdown
[링크 텍스트](URL)
````

#### 이미지

```markdown
![이미지 설명](이미지URL)
```

### 5. 포스트 예시

```markdown
---
layout: post
title: "Spring Boot 마이크로서비스 아키텍처"
date: 2024-01-15
categories: [architecture]
tags: [spring-boot, microservices, java]
author: "Motoo Team"
description: "Spring Boot를 활용한 마이크로서비스 아키텍처 설계 방법"
---

# Spring Boot 마이크로서비스 아키텍처

## 개요

이 문서는 Spring Boot를 활용한 마이크로서비스 아키텍처의 설계와 구현 방법을 설명합니다.

## 주요 특징

- **독립적인 서비스**: 각 서비스는 독립적으로 개발, 배포, 확장 가능
- **REST API**: 서비스 간 통신을 위한 REST API 활용
- **데이터베이스 분리**: 각 서비스별 독립적인 데이터베이스

## 기술 스택

- **Backend**: Spring Boot 3.x, Java 17
- **Database**: PostgreSQL, Redis
- **Message Queue**: Apache Kafka
- **Container**: Docker, Kubernetes

## 결론

마이크로서비스 아키텍처는 확장성과 유지보수성을 크게 향상시킵니다.
```

## 🎨 사이트 특징

- **Medium 스타일**: 깔끔하고 읽기 쉬운 디자인
- **반응형**: 모든 디바이스에서 최적화
- **자동 빌드**: GitHub Pages에서 자동으로 빌드 및 배포
- **카테고리/태그**: 체계적인 분류 시스템

## 📁 프로젝트 구조

```
mo2-motoo.github.io/
├── _posts/                    # 마크다운 포스트들
├── _layouts/                  # Jekyll 레이아웃
├── _includes/                 # 재사용 컴포넌트
├── assets/                    # CSS, JS, 이미지
├── _config.yml               # Jekyll 설정
├── Gemfile                   # Ruby 의존성
└── index.html                # 메인 페이지
```

## 🚀 로컬 개발 (선택사항)

### Jekyll 로컬 서버 실행

```bash
# Ruby와 Jekyll 설치 후
bundle install
bundle exec jekyll serve
```

### 접속

```
http://localhost:4000
```

## 📞 문의

문서화 관련 문의사항이 있으시면 GitHub Issues를 이용해주세요.

---

**Happy Documenting! 📚✨**
