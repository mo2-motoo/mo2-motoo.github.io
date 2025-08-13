import { useParams, Link, useNavigate } from "react-router-dom";
import { usePostContext } from "../contexts/PostContext";
import { categories } from "../data/categories";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Edit, Trash2, ArrowLeft, ArrowRight } from "lucide-react";

export const Post = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const { posts, getPostBySlug, deletePost, getPostCountByCategory } =
    usePostContext();

  const post = getPostBySlug(slug || "");
  const currentCategory = categories.find((cat) => cat.slug === category);

  if (!post || !currentCategory) {
    return (
      <div className="container">
        <div className="error-page">
          <h1>포스트를 찾을 수 없습니다</h1>
          <p>요청하신 포스트가 존재하지 않습니다.</p>
          <Link to="/" className="btn btn-primary">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 같은 카테고리의 다른 포스트들
  const categoryPosts = posts.filter((p) => p.category === category);
  const currentIndex = categoryPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < categoryPosts.length - 1
      ? categoryPosts[currentIndex + 1]
      : null;

  const handleDelete = () => {
    if (window.confirm("정말로 이 포스트를 삭제하시겠습니까?")) {
      deletePost(post.id);
      navigate(`/${category}`);
    }
  };

  return (
    <div className="container">
      {/* Post Header */}
      <header className="post-header">
        <div className="post-meta">
          <span className="post-category">
            <Link to={`/${category}`}>
              {currentCategory.icon} {currentCategory.name}
            </Link>
          </span>
          <span className="post-date">
            {format(new Date(post.publishedAt), "yyyy년 M월 d일", {
              locale: ko,
            })}
          </span>
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <span className="post-updated">
              (수정됨:{" "}
              {format(new Date(post.updatedAt), "yyyy년 M월 d일", {
                locale: ko,
              })}
              )
            </span>
          )}
        </div>

        <h1 className="post-title">{post.title}</h1>

        <p className="post-excerpt">{post.excerpt}</p>

        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="post-author">
          <i className="fas fa-user"></i>
          <span>{post.author}</span>
        </div>

        {/* Action Buttons */}
        <div className="post-actions">
          <Link to={`/editor/${post.id}`} className="btn btn-secondary">
            <Edit size={16} />
            수정
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            <Trash2 size={16} />
            삭제
          </button>
        </div>
      </header>

      {/* Post Content */}
      <article className="post-content">
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Post Navigation */}
      <nav className="post-navigation">
        <div className="nav-links">
          {prevPost ? (
            <Link
              to={`/${category}/${prevPost.slug}`}
              className="nav-link prev"
            >
              <ArrowLeft size={16} />
              <div className="nav-content">
                <span className="nav-label">이전 포스트</span>
                <span className="nav-title">{prevPost.title}</span>
              </div>
            </Link>
          ) : (
            <div className="nav-link prev disabled">
              <ArrowLeft size={16} />
              <span>이전 포스트 없음</span>
            </div>
          )}

          {nextPost ? (
            <Link
              to={`/${category}/${nextPost.slug}`}
              className="nav-link next"
            >
              <div className="nav-content">
                <span className="nav-label">다음 포스트</span>
                <span className="nav-title">{nextPost.title}</span>
              </div>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="nav-link next disabled">
              <span>다음 포스트 없음</span>
              <ArrowRight size={16} />
            </div>
          )}
        </div>
      </nav>

      {/* Back to Category */}
      <div className="back-to-category">
        <Link to={`/${category}`} className="btn btn-secondary">
          <ArrowLeft size={16} />
          {currentCategory.name} 카테고리로 돌아가기
        </Link>
      </div>
    </div>
  );
};
