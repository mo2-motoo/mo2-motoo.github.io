import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostContext } from "../contexts/PostContext";
import { categories } from "../data/categories";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Save, Eye, EyeOff, Upload, Download } from "lucide-react";

export const PostEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPostById, addPost, updatePost } = usePostContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "architecture",
    tags: "",
    author: "",
  });

  // 편집 모드인 경우 기존 데이터 로드
  useEffect(() => {
    if (id) {
      const existingPost = getPostById(id);
      if (existingPost) {
        setFormData({
          title: existingPost.title,
          excerpt: existingPost.excerpt,
          content: existingPost.content,
          category: existingPost.category,
          tags: existingPost.tags.join(", "),
          author: existingPost.author,
        });
      }
    }
  }, [id, getPostById]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 마크다운 파일 업로드 처리
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.endsWith(".md")) {
      alert("마크다운(.md) 파일만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split("\n");

      // YAML front matter 파싱
      const frontMatter: any = {};
      let contentStart = 0;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i] === "---") {
          if (i === 0) continue;
          contentStart = i + 1;
          break;
        }

        const [key, ...valueParts] = lines[i].split(": ");
        if (key && valueParts.length > 0) {
          frontMatter[key.trim()] = valueParts.join(": ").trim();
        }
      }

      // 폼 데이터 업데이트
      setFormData({
        title: frontMatter.title || "",
        excerpt: frontMatter.excerpt || "",
        content: lines.slice(contentStart).join("\n"),
        category: frontMatter.category || "architecture",
        tags: frontMatter.tags || "",
        author: frontMatter.author || "",
      });

      alert("마크다운 파일이 성공적으로 로드되었습니다!");
    };

    reader.readAsText(file);
  };

  // 마크다운 파일 다운로드
  const downloadMarkdown = () => {
    const markdownContent = `---
title: ${formData.title}
excerpt: ${formData.excerpt}
category: ${formData.category}
tags: ${formData.tags}
author: ${formData.author}
publishedAt: ${new Date().toISOString()}
---

${formData.content}`;

    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.title
      .replace(/[^a-z0-9가-힣]/gi, "-")
      .toLowerCase()}.md`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };

      if (id) {
        // 수정 모드
        await updatePost(id, postData);
        alert("포스트가 성공적으로 수정되었습니다!");
      } else {
        // 새 포스트 작성 모드
        await addPost(postData);
        alert("새 포스트가 성공적으로 작성되었습니다!");
      }

      // 홈페이지로 리다이렉트
      navigate("/");
    } catch (error) {
      console.error("포스트 저장 실패:", error);
      alert("포스트 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.excerpt.trim() &&
      formData.content.trim() &&
      formData.author.trim()
    );
  };

  return (
    <div className="container">
      <header className="editor-header">
        <h1>{id ? "포스트 수정" : "새 포스트 작성"}</h1>
        <p>
          {id
            ? "기존 포스트를 수정합니다."
            : "새로운 기술 블로그 포스트를 작성합니다."}
        </p>

        {/* 파일 업로드/다운로드 버튼 */}
        <div className="file-actions">
          <input
            ref={fileInputRef}
            type="file"
            accept=".md"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-secondary"
          >
            <Upload size={16} />
            마크다운 파일 업로드
          </button>

          <button
            type="button"
            onClick={downloadMarkdown}
            className="btn btn-secondary"
            disabled={!isFormValid()}
          >
            <Download size={16} />
            마크다운 파일 다운로드
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="포스트 제목을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">카테고리 *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="excerpt">요약 *</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="포스트 요약을 입력하세요"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">작성자 *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="작성자 이름을 입력하세요"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">태그</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="태그를 쉼표로 구분하여 입력하세요 (예: Spring Boot, React, Docker)"
          />
          <small>쉼표(,)로 구분하여 여러 태그를 입력할 수 있습니다.</small>
        </div>

        <div className="form-group">
          <div className="content-header">
            <label htmlFor="content">내용 *</label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="preview-toggle"
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              {showPreview ? "편집 모드" : "미리보기"}
            </button>
          </div>

          {showPreview ? (
            <div className="markdown-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {formData.content}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="마크다운 형식으로 포스트 내용을 작성하세요

# 제목
## 부제목
- 목록 항목
**굵은 글씨**
`코드`
[링크](https://example.com)"
              rows={20}
              required
              className="markdown-editor"
            />
          )}
          <small>
            마크다운 형식을 지원합니다. 제목(#), 목록(-), 코드(`), 링크 등을
            사용할 수 있습니다.
          </small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-secondary"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className="btn btn-primary"
          >
            <Save size={16} />
            {isSubmitting ? "저장 중..." : id ? "수정 완료" : "포스트 작성"}
          </button>
        </div>
      </form>
    </div>
  );
};
