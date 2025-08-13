import { Link } from "react-router-dom";
import { usePostContext } from "../contexts/PostContext";
import { categories } from "../data/categories";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const Home = () => {
  const { posts, getPostCountByCategory } = usePostContext();

  // 카테고리별 포스트 수 업데이트
  const categoriesWithCount = categories.map((category) => ({
    ...category,
    postCount: getPostCountByCategory(category.id),
  }));

  // 최근 포스트 (최대 3개)
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-container">
          <h1 className="hero-title">Motoo Tech Blog</h1>
          <p className="hero-subtitle">
            프로젝트의 기술적 경험과 지식을 공유하는 공간입니다
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">기술 문서</span>
            </div>
            <div className="stat">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">카테고리</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">마크다운</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Posts */}
      <section className="featured-posts">
        <h2 className="section-title">최근 포스트</h2>
        <div className="posts-grid">
          {recentPosts.map((post) => (
            <article key={post.id} className="post-card featured">
              <div className="post-meta">
                <span className="post-category">{post.category}</span>
                <span className="post-date">
                  {format(new Date(post.publishedAt), "yyyy년 M월 d일", {
                    locale: ko,
                  })}
                </span>
              </div>
              <h3 className="post-title">
                <Link to={`/${post.category}/${post.slug}`}>{post.title}</Link>
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
                <Link
                  to={`/${post.category}/${post.slug}`}
                  className="read-more"
                >
                  읽어보기 <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">카테고리</h2>
        <div className="categories-grid">
          {categoriesWithCount.map((category) => (
            <Link
              key={category.id}
              to={`/${category.slug}`}
              className="category-card"
            >
              <div className="category-icon">
                <span>{category.icon}</span>
              </div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <div className="category-stats">
                <span className="post-count">
                  {category.postCount}개 포스트
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>Motoo Tech Blog 소개</h2>
          <p>
            Motoo 프로젝트 개발 과정에서 얻은 기술적 경험과 지식을 공유하는
            공간입니다. 마이크로서비스 아키텍처, Spring Boot, React 등 현대적인
            기술 스택을 활용한 개발 경험을 담았습니다. 한국투자증권 API를 활용한
            주식 투자 플랫폼의 설계와 구현 과정을 상세히 다루고 있습니다.
          </p>
          <div className="about-features">
            <div className="feature">
              <i className="fas fa-rocket"></i>
              <h3>실전 경험</h3>
              <p>실제 프로젝트에서 검증된 기술과 패턴</p>
            </div>
            <div className="feature">
              <i className="fas fa-book-open"></i>
              <h3>상세한 설명</h3>
              <p>코드 예제와 함께하는 구체적인 구현 방법</p>
            </div>
            <div className="feature">
              <i className="fas fa-users"></i>
              <h3>팀 협업</h3>
              <p>팀원들과 함께한 개발 경험과 학습</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
