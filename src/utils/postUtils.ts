import { Post, PostFormData } from "../types";

// 고유 ID 생성
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 슬러그 생성 (URL 친화적인 제목)
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s]/g, "") // 특수문자 제거
    .replace(/\s+/g, "-") // 공백을 하이픈으로 변경
    .replace(/-+/g, "-") // 연속된 하이픈을 하나로
    .trim();
};

// 새 포스트 생성
export const createPost = (postData: PostFormData): Post => {
  return {
    id: generateId(),
    slug: generateSlug(postData.title),
    title: postData.title,
    excerpt: postData.excerpt,
    content: postData.content,
    category: postData.category,
    tags: postData.tags,
    author: postData.author,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// 포스트 업데이트
export const updatePost = (existingPost: Post, updates: Partial<PostFormData>): Post => {
  return {
    ...existingPost,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
};

// 포스트 검색
export const searchPosts = (posts: Post[], query: string): Post[] => {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// 포스트 필터링 (카테고리별)
export const filterPostsByCategory = (posts: Post[], category: string): Post[] => {
  return posts.filter((post) => post.category === category);
};

// 포스트 정렬
export const sortPosts = (
  posts: Post[],
  sortBy: "date" | "title" | "author"
): Post[] => {
  const sortedPosts = [...posts];
  
  switch (sortBy) {
    case "date":
      return sortedPosts.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case "title":
      return sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    case "author":
      return sortedPosts.sort((a, b) => a.author.localeCompare(b.author));
    default:
      return sortedPosts;
  }
};

// 포스트 유효성 검사
export const validatePost = (postData: PostFormData): string[] => {
  const errors: string[] = [];
  
  if (!postData.title.trim()) {
    errors.push("제목을 입력해주세요.");
  }
  
  if (!postData.excerpt.trim()) {
    errors.push("요약을 입력해주세요.");
  }
  
  if (!postData.content.trim()) {
    errors.push("내용을 입력해주세요.");
  }
  
  if (!postData.category) {
    errors.push("카테고리를 선택해주세요.");
  }
  
  if (!postData.author.trim()) {
    errors.push("작성자를 입력해주세요.");
  }
  
  return errors;
};

// 태그 정리 (중복 제거, 공백 제거)
export const cleanTags = (tags: string[]): string[] => {
  return [...new Set(tags.map(tag => tag.trim()).filter(tag => tag.length > 0))];
};

// 포스트 통계
export const getPostStats = (posts: Post[]) => {
  const totalPosts = posts.length;
  const categories = [...new Set(posts.map(post => post.category))];
  const authors = [...new Set(posts.map(post => post.author))];
  const allTags = posts.flatMap(post => post.tags);
  const uniqueTags = [...new Set(allTags)];
  
  return {
    totalPosts,
    categories: categories.length,
    authors: authors.length,
    tags: uniqueTags.length,
    latestPost: posts.length > 0 ? posts[0] : null,
  };
};
