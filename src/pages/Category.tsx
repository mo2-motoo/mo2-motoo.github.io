import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { usePostContext } from "../contexts/PostContext";
import { categories } from "../data/categories";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Search, SortAsc, Edit, Trash2, Eye } from "lucide-react";

export const Category = () => {
  const { category } = useParams();
  const { 
    filteredPosts, 
    searchQuery, 
    sortBy, 
    search, 
    changeSort,
    getPostsByCategory,
    deletePost
  } = usePostContext();

  const currentCategory = categories.find((cat) => cat.slug === category);

  // 카테고리 변경 시 필터링 적용
  useEffect(() => {
    // 카테고리별 필터링은 이미 useEffect에서 처리됨
  }, [category]);

  // 포스트 삭제 처리
  const handleDelete = async (postId: string, postTitle: string) => {
    if (window.confirm(`"${postTitle}" 포스트를 정말로 삭제하시겠습니까?`)) {
      try {
        await deletePost(postId);
        alert("포스트가 성공적으로 삭제되었습니다!");
      } catch (error) {
        console.error("포스트 삭제 실패:", error);
        alert("포스트 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  if (!currentCategory) {
    return (
      <div className="container">
        <div className="error-page">
          <h1>카테고리를 찾을 수 없습니다</h1>
          <p>요청하신 카테고리가 존재하지 않습니다.</p>
          <Link to="/" className="btn btn-primary">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 현재 카테고리의 포스트들
  const categoryPosts = category ? getPostsByCategory(category) : [];
  const displayPosts = searchQuery ? filteredPosts : categoryPosts;

  return (
    <div className="container">
      {/* Category Header */}
      <header className="category-header">
        <div className="category-info">
          <div className="category-icon">
            <span>{currentCategory.icon}</span>
          </div>
          <div className="category-details">
            <h1>{currentCategory.name}</h1>
            <p>{currentCategory.description}</p>
            <div className="category-stats">
              <span className="post-count">
                {categoryPosts.length}개 포스트
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="포스트 검색..."
            value={searchQuery}
            onChange={(e) => search(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="sort-control">
            <SortAsc size={20} />
            <select
              value={sortBy}
              onChange={(e) =>
                changeSort(e.target.value as "date" | "title" | "author")
              }
              className="sort-select"
            >
              <option value="date">최신순</option>
              <option value="title">제목순</option>
              <option value="author">작성자순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <section className="posts-section">
        {displayPosts.length > 0 ? (
          <div className="posts-grid">
            {displayPosts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-meta">
                  <span className="post-category">{post.category}</span>
                  <span className="post-date">
                    {format(new Date(post.publishedAt), "yyyy년 M월 d일", {
                      locale: ko,
                    })}
                  </span>
                </div>
                <h3 className="post-title">
                  <Link to={`/${post.category}/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-footer">
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
                </div>

                {/* Action Buttons */}
                <div className="post-actions">
                  <Link
                    to={`/${post.category}/${post.slug}`}
                    className="btn btn-primary btn-sm"
                  >
                    <Eye size={16} />
                    읽어보기
                  </Link>
                  <Link
                    to={`/editor/${post.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <Edit size={16} />
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={16} />
                    삭제
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-posts">
            <i className="fas fa-search"></i>
            <h3>검색 결과가 없습니다</h3>
            <p>
              {searchQuery
                ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
                : "이 카테고리에 포스트가 없습니다."}
            </p>
            <Link to="/" className="btn btn-primary">
              홈으로 돌아가기
            </Link>
          </div>
        )}
      </section>

      {/* Back to Home */}
      <div className="back-to-home">
        <Link to="/" className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};
