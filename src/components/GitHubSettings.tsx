import { useState, useEffect } from "react";
import {
  getGitHubToken,
  setGitHubToken,
  removeGitHubToken,
} from "../config/github";
import { Settings, Key, Trash2, CheckCircle, AlertCircle } from "lucide-react";

export const GitHubSettings = () => {
  const [token, setToken] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const savedToken = getGitHubToken();
    setIsConnected(!!savedToken);
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleSaveToken = () => {
    if (token.trim()) {
      setGitHubToken(token.trim());
      setIsConnected(true);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleRemoveToken = () => {
    if (window.confirm("GitHub 토큰을 제거하시겠습니까?")) {
      removeGitHubToken();
      setToken("");
      setIsConnected(false);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setToken(getGitHubToken() || "");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setToken(getGitHubToken() || "");
  };

  return (
    <div className="github-settings">
      <div className="settings-header">
        <Settings size={20} />
        <h3>GitHub 설정</h3>
      </div>

      <div className="settings-content">
        {isConnected && !isEditing ? (
          <div className="connected-state">
            <div className="status-info">
              <CheckCircle size={16} className="status-icon connected" />
              <span>GitHub에 연결됨</span>
            </div>
            <div className="token-actions">
              <button onClick={handleEdit} className="btn btn-secondary btn-sm">
                토큰 수정
              </button>
              <button
                onClick={handleRemoveToken}
                className="btn btn-danger btn-sm"
              >
                <Trash2 size={16} />
                연결 해제
              </button>
            </div>
          </div>
        ) : (
          <div className="token-input-section">
            <div className="input-group">
              <label htmlFor="github-token">
                <Key size={16} />
                GitHub Personal Access Token
              </label>
              <input
                id="github-token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="token-input"
              />
              <small>
                GitHub에서 Personal Access Token을 생성하여 입력하세요.
                <br />
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="help-link"
                >
                  토큰 생성 방법 보기
                </a>
              </small>
            </div>
            <div className="input-actions">
              <button
                onClick={handleSaveToken}
                disabled={!token.trim()}
                className="btn btn-primary"
              >
                저장
              </button>
              {isEditing && (
                <button onClick={handleCancel} className="btn btn-secondary">
                  취소
                </button>
              )}
            </div>
          </div>
        )}

        {/* 성공/오류 메시지 */}
        {showSuccess && (
          <div className="message success">
            <CheckCircle size={16} />
            GitHub 토큰이 성공적으로 저장되었습니다!
          </div>
        )}

        {showError && (
          <div className="message error">
            <AlertCircle size={16} />
            GitHub 토큰 저장에 실패했습니다.
          </div>
        )}

        {/* 도움말 */}
        <div className="help-section">
          <h4>GitHub 토큰이 필요한 이유</h4>
          <ul>
            <li>포스트를 실제 마크다운(.md) 파일로 GitHub에 저장</li>
            <li>Git 버전 관리로 포스트 변경 이력 추적</li>
            <li>GitHub Pages로 자동 블로그 배포</li>
            <li>다른 개발자와 포스트 공유 및 협업</li>
          </ul>

          <h4>토큰 생성 단계</h4>
          <ol>
            <li>
              GitHub.com → Settings → Developer settings → Personal access
              tokens
            </li>
            <li>Generate new token (classic) 클릭</li>
            <li>Note에 "Motoo Blog" 입력</li>
            <li>Expiration: No expiration 또는 적절한 기간 선택</li>
            <li>Scopes에서 "repo" 체크 (전체 저장소 접근 권한)</li>
            <li>Generate token 클릭 후 생성된 토큰 복사</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
