// GitHub API 설정
export const GITHUB_CONFIG = {
  REPO_OWNER: "mo2-motoo",
  REPO_NAME: "mo2-motoo.github.io",
  BRANCH: "main",
  POSTS_PATH: "posts",
  API_BASE_URL: "https://api.github.com",
};

// GitHub API 헬퍼 함수들
export class GitHubAPI {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  // 포스트를 GitHub에 저장
  async savePost(post: any): Promise<boolean> {
    try {
      const markdownContent = this.generateMarkdownContent(post);
      const filePath = `${GITHUB_CONFIG.POSTS_PATH}/${post.slug}.md`;

      const response = await fetch(
        `${GITHUB_CONFIG.API_BASE_URL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${this.token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `Add post: ${post.title}`,
            content: btoa(unescape(encodeURIComponent(markdownContent))), // UTF-8 안전한 Base64 인코딩
            branch: GITHUB_CONFIG.BRANCH,
          }),
        }
      );

      if (response.ok) {
        console.log("포스트가 GitHub에 성공적으로 저장되었습니다!");
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(`GitHub API 오류: ${errorData.message}`);
      }
    } catch (error) {
      console.error("GitHub 저장 실패:", error);
      throw error;
    }
  }

  // 포스트 업데이트
  async updatePost(post: any, existingSha: string): Promise<boolean> {
    try {
      const markdownContent = this.generateMarkdownContent(post);
      const filePath = `${GITHUB_CONFIG.POSTS_PATH}/${post.slug}.md`;

      const response = await fetch(
        `${GITHUB_CONFIG.API_BASE_URL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${this.token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `Update post: ${post.title}`,
            content: btoa(unescape(encodeURIComponent(markdownContent))),
            branch: GITHUB_CONFIG.BRANCH,
            sha: existingSha,
          }),
        }
      );

      if (response.ok) {
        console.log("포스트가 GitHub에 성공적으로 업데이트되었습니다!");
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(`GitHub API 오류: ${errorData.message}`);
      }
    } catch (error) {
      console.error("GitHub 업데이트 실패:", error);
      throw error;
    }
  }

  // 포스트 삭제
  async deletePost(post: any, existingSha: string): Promise<boolean> {
    try {
      const filePath = `${GITHUB_CONFIG.POSTS_PATH}/${post.slug}.md`;

      const response = await fetch(
        `${GITHUB_CONFIG.API_BASE_URL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/${filePath}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `token ${this.token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `Delete post: ${post.title}`,
            branch: GITHUB_CONFIG.BRANCH,
            sha: existingSha,
          }),
        }
      );

      if (response.ok) {
        console.log("포스트가 GitHub에서 성공적으로 삭제되었습니다!");
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(`GitHub API 오류: ${errorData.message}`);
      }
    } catch (error) {
      console.error("GitHub 삭제 실패:", error);
      throw error;
    }
  }

  // 마크다운 콘텐츠 생성
  private generateMarkdownContent(post: any): string {
    return `---
title: ${post.title}
excerpt: ${post.excerpt}
category: ${post.category}
tags: ${post.tags.join(", ")}
author: ${post.author}
publishedAt: ${post.publishedAt}
updatedAt: ${post.updatedAt}
---

${post.content}`;
  }

  // 파일의 SHA 값 가져오기 (업데이트/삭제 시 필요)
  async getFileSha(filePath: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${GITHUB_CONFIG.API_BASE_URL}/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/${filePath}`,
        {
          headers: {
            Authorization: `token ${this.token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.sha;
      } else if (response.status === 404) {
        return null; // 파일이 존재하지 않음
      } else {
        throw new Error("파일 정보를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("파일 SHA 가져오기 실패:", error);
      return null;
    }
  }
}

// GitHub 토큰 관리
export const getGitHubToken = (): string | null => {
  return localStorage.getItem("github_token");
};

export const setGitHubToken = (token: string): void => {
  localStorage.setItem("github_token", token);
};

export const removeGitHubToken = (): void => {
  localStorage.removeItem("github_token");
};

// GitHub API 인스턴스 생성
export const createGitHubAPI = (): GitHubAPI | null => {
  const token = getGitHubToken();
  if (!token) {
    return null;
  }
  return new GitHubAPI(token);
};
