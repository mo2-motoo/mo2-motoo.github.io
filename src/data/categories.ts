import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'architecture',
    name: '아키텍처',
    description: '시스템 아키텍처, 데이터베이스 설계, 기술 스택',
    icon: '🏗️',
    slug: 'architecture',
    postCount: 0
  },
  {
    id: 'domain',
    name: '도메인',
    description: '비즈니스 도메인 분석과 설계, 핵심 엔티티',
    icon: '🎯',
    slug: 'domain',
    postCount: 0
  },
  {
    id: 'implementation',
    name: '구현',
    description: 'Spring Boot, React, 실제 구현 패턴과 모범 사례',
    icon: '💻',
    slug: 'implementation',
    postCount: 0
  },
  {
    id: 'testing',
    name: '테스트',
    description: '단위 테스트, 통합 테스트, E2E 테스트 전략',
    icon: '🧪',
    slug: 'testing',
    postCount: 0
  },
  {
    id: 'troubleshooting',
    name: '문제해결',
    description: '개발 과정에서 마주한 문제들과 해결 방법',
    icon: '🔧',
    slug: 'troubleshooting',
    postCount: 0
  }
];
