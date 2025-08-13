import React, { createContext, useContext, useState, useEffect } from "react";
import { Post, PostFormData } from "../types";
import { posts as initialPosts } from "../data/posts";
import { generateId, generateSlug } from "../utils/postUtils";
import { createGitHubAPI, getGitHubToken } from "../config/github";

interface PostContextType {
  posts: Post[];
  filteredPosts: Post[];
  searchQuery: string;
  sortBy: "date" | "title" | "author";
  search: (query: string) => void;
  changeSort: (sortBy: "date" | "title" | "author") => void;
  addPost: (postData: PostFormData) => Promise<void>;
  updatePost: (id: string, postData: PostFormData) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPostById: (id: string) => Post | undefined;
  getPostBySlug: (slug: string) => Post | undefined;
  getPostsByCategory: (category: string) => Post[];
  getPostCountByCategory: (category: string) => number;
  filterByCategory: (category: string) => void;
  isGitHubConnected: boolean;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// 로컬 스토리지 키
const STORAGE_KEY = "motoo-blog-posts";

// 로컬 스토리지에서 데이터 로드
const loadPostsFromStorage = (): Post[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("로컬 스토리지에서 데이터 로드 실패:", error);
  }
  return initialPosts;
};

// 로컬 스토리지에 데이터 저장
const savePostsToStorage = (posts: Post[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("로컬 스토리지에 데이터 저장 실패:", error);
  }
};

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>(() => loadPostsFromStorage());
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title" | "author">("date");

  // GitHub 연결 상태 확인
  const isGitHubConnected = !!getGitHubToken();

  // 포스트 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    savePostsToStorage(posts);
  }, [posts]);

  // 검색 및 필터링 적용
  useEffect(() => {
    let filtered = posts;

    // 검색어 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchQuery, sortBy]);

  const search = (query: string) => {
    setSearchQuery(query);
  };

  const changeSort = (newSortBy: "date" | "title" | "author") => {
    setSortBy(newSortBy);
  };

  const addPost = async (postData: PostFormData): Promise<void> => {
    const newPost: Post = {
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

    try {
      // 1. 로컬 상태 업데이트 (즉시 반영)
      setPosts((prev) => [newPost, ...prev]);

      // 2. GitHub에 .md 파일 저장 (백그라운드에서)
      const githubAPI = createGitHubAPI();
      if (githubAPI) {
        try {
          await githubAPI.savePost(newPost);
          console.log("포스트가 GitHub에 성공적으로 저장되었습니다!");
        } catch (error) {
          console.error("GitHub 저장 실패:", error);
          // GitHub 저장 실패해도 로컬에는 저장됨
        }
      }
    } catch (error) {
      console.error("포스트 저장 실패:", error);
      throw error;
    }
  };

  const updatePost = async (
    id: string,
    postData: PostFormData
  ): Promise<void> => {
    const existingPost = posts.find((post) => post.id === id);
    if (!existingPost) {
      throw new Error("수정할 포스트를 찾을 수 없습니다.");
    }

    const updatedPost: Post = {
      ...existingPost,
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      category: postData.category,
      tags: postData.tags,
      author: postData.author,
      updatedAt: new Date().toISOString(),
    };

    try {
      // 1. 로컬 상태 업데이트 (즉시 반영)
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? updatedPost : post))
      );

      // 2. GitHub에 .md 파일 업데이트 (백그라운드에서)
      const githubAPI = createGitHubAPI();
      if (githubAPI) {
        try {
          const filePath = `posts/${updatedPost.slug}.md`;
          const existingSha = await githubAPI.getFileSha(filePath);

          if (existingSha) {
            await githubAPI.updatePost(updatedPost, existingSha);
            console.log("포스트가 GitHub에 성공적으로 업데이트되었습니다!");
          } else {
            // 파일이 존재하지 않으면 새로 생성
            await githubAPI.savePost(updatedPost);
            console.log("포스트가 GitHub에 성공적으로 저장되었습니다!");
          }
        } catch (error) {
          console.error("GitHub 업데이트 실패:", error);
          // GitHub 업데이트 실패해도 로컬에는 업데이트됨
        }
      }
    } catch (error) {
      console.error("포스트 업데이트 실패:", error);
      throw error;
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    const postToDelete = posts.find((post) => post.id === id);
    if (!postToDelete) {
      throw new Error("삭제할 포스트를 찾을 수 없습니다.");
    }

    try {
      // 1. 로컬 상태 업데이트 (즉시 반영)
      setPosts((prev) => prev.filter((post) => post.id !== id));

      // 2. GitHub에서 .md 파일 삭제 (백그라운드에서)
      const githubAPI = createGitHubAPI();
      if (githubAPI) {
        try {
          const filePath = `posts/${postToDelete.slug}.md`;
          const existingSha = await githubAPI.getFileSha(filePath);

          if (existingSha) {
            await githubAPI.deletePost(postToDelete, existingSha);
            console.log("포스트가 GitHub에서 성공적으로 삭제되었습니다!");
          }
        } catch (error) {
          console.error("GitHub 삭제 실패:", error);
          // GitHub 삭제 실패해도 로컬에서는 삭제됨
        }
      }
    } catch (error) {
      console.error("포스트 삭제 실패:", error);
      throw error;
    }
  };

  const getPostById = (id: string) => {
    return posts.find((post) => post.id === id);
  };

  const getPostBySlug = (slug: string) => {
    return posts.find((post) => post.slug === slug);
  };

  const getPostsByCategory = (category: string) => {
    return posts.filter((post) => post.category === category);
  };

  const getPostCountByCategory = (category: string) => {
    return posts.filter((post) => post.category === category).length;
  };

  const filterByCategory = (category: string) => {
    // 카테고리별 필터링은 이미 useEffect에서 처리됨
    // 이 함수는 향후 확장을 위해 유지
  };

  const value: PostContextType = {
    posts,
    filteredPosts,
    searchQuery,
    sortBy,
    search,
    changeSort,
    addPost,
    updatePost,
    deletePost,
    getPostById,
    getPostBySlug,
    getPostsByCategory,
    getPostCountByCategory,
    filterByCategory,
    isGitHubConnected,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
