import { GitHubSettings } from "../components/GitHubSettings";

export const Settings = () => {
  return (
    <div className="container">
      <header className="page-header">
        <h1>⚙️ 설정</h1>
        <p>블로그 설정과 GitHub 연동을 관리합니다.</p>
      </header>

      <div className="settings-content">
        <GitHubSettings />

        <div className="info-section">
          <h3>📚 사용 방법</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>1. GitHub 토큰 생성</h4>
              <p>
                GitHub에서 Personal Access Token을 생성하여 블로그와 연동합니다.
              </p>
            </div>

            <div className="info-card">
              <h4>2. 포스트 작성</h4>
              <p>
                마크다운으로 포스트를 작성하면 자동으로 GitHub에 .md 파일로
                저장됩니다.
              </p>
            </div>

            <div className="info-card">
              <h4>3. 자동 배포</h4>
              <p>
                GitHub Pages가 자동으로 업데이트된 포스트를 블로그에 반영합니다.
              </p>
            </div>

            <div className="info-card">
              <h4>4. 버전 관리</h4>
              <p>
                Git으로 포스트의 모든 변경 이력을 추적하고 관리할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
