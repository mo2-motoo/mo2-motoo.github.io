import { Post } from "../types";

export const posts: Post[] = [
  {
    id: "1",
    slug: "architecture-overview",
    title: "Motoo 프로젝트 아키텍처 개요",
    excerpt:
      "Motoo 프로젝트의 전체적인 시스템 아키텍처와 설계 원칙에 대해 알아봅니다.",
    content: `# Motoo 프로젝트 아키텍처 개요

## 개요
Motoo는 마이크로서비스 아키텍처를 기반으로 한 주식 거래 플랫폼입니다.

## 주요 특징
- 마이크로서비스 기반 설계
- 도메인 주도 설계 (DDD) 적용
- 이벤트 기반 아키텍처
- 확장 가능한 구조

## 기술 스택
- Backend: Spring Boot, Spring Cloud
- Database: PostgreSQL, Redis
- Monitoring: Prometheus, Grafana
- Container: Docker, Docker Compose`,
    category: "architecture",
    tags: ["아키텍처", "마이크로서비스", "Spring Boot"],
    author: "Motoo Team",
    publishedAt: "2024-12-19T00:00:00.000Z",
    updatedAt: "2024-12-19T00:00:00.000Z",
  },
  {
    id: "2",
    slug: "domain-overview",
    title: "도메인 설계 개요",
    excerpt:
      "Motoo 프로젝트의 핵심 도메인들과 비즈니스 로직 설계에 대해 알아봅니다.",
    content: `# 도메인 설계 개요

## 핵심 도메인
- User: 사용자 관리
- Stock: 주식 정보 관리
- Order: 주문 처리
- Portfolio: 포트폴리오 관리
- Execution: 주문 실행

## 설계 원칙
- 도메인 경계 명확화
- 비즈니스 규칙 캡슐화
- 느슨한 결합`,
    category: "domain",
    tags: ["도메인설계", "DDD", "비즈니스로직"],
    author: "Motoo Team",
    publishedAt: "2024-12-19T00:00:00.000Z",
    updatedAt: "2024-12-19T00:00:00.000Z",
  },
];
