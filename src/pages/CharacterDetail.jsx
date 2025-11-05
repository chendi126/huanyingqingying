import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { characters } from '../data/characters';
import '../styles/CharacterDetail.css';

export default function CharacterDetail() {
  const { id } = useParams();
  const character = characters.find((c) => c.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('form'); // 'form', 'spirit', 'beauty'

  if (!character) {
    return (
      <div className="detail-container">
        <div className="not-found">
          <h2>人物未找到</h2>
          <Link to="/" className="back-button">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  // 获取代表作品（从成就中提取第一个，或使用默认值）
  const representativeWork = character.achievements && character.achievements.length > 0
    ? character.achievements[0]
    : character.title;

  return (
    <div className="detail-container">
      <header className="detail-header">
        <div className="header-title-wrapper">
          <h1 className="header-title">焕影清音</h1>
          <p className="header-subtitle">——华县皮影的前世今生</p>
        </div>
      </header>

      <main className="detail-content">
        {/* 顶部区域：左侧图片，右侧姓名和代表作品 */}
        <div className="character-top-section">
          <div className="character-image-container">
            <img
              src={character.image}
              alt={character.name}
              className="character-main-image"
            />
          </div>
          <div className="character-info-container">
            <h1 className="character-name">
              <span className="name-text">{character.name}</span>
              <img src="/jytongbao5.png" alt="" className="name-icon" />
            </h1>
            <p className="character-representative-work">
              <span className="work-label">代表作品：</span>
              <span className="work-content">{representativeWork}</span>
            </p>
          </div>
        </div>

        {/* 信息卡片区域 */}
        <div className="info-card-section">
          {/* 标签页导航 */}
          <div className="tabs-navigation">
            <button
              className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => setActiveTab('form')}
            >
              形·皮相
            </button>
            <button
              className={`tab-button ${activeTab === 'spirit' ? 'active' : ''}`}
              onClick={() => setActiveTab('spirit')}
            >
              神·骨相
            </button>
            <button
              className={`tab-button ${activeTab === 'beauty' ? 'active' : ''}`}
              onClick={() => setActiveTab('beauty')}
            >
              美·真如
            </button>
          </div>

          {/* 标签页内容 */}
          <div className="tabs-content">
            {/* 形·皮相 - 人物介绍 */}
            {activeTab === 'form' && (
              <div className="tab-panel fade-in">
                <h2 className="tab-panel-title">
                  <span className="title-text">人物介绍</span>
                  <img src="/piying1.png" alt="" className="title-icon" />
                </h2>
                <div className="tab-panel-content">
                  {character.description.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            {/* 神·骨相 - 主要成就 */}
            {activeTab === 'spirit' && (
              <div className="tab-panel fade-in">
                <h2 className="tab-panel-title">
                  <span className="title-text">主要成就</span>
                  <img src="/piying2.png" alt="" className="title-icon" />
                </h2>
                <div className="tab-panel-content">
                  {character.achievements && character.achievements.length > 0 ? (
                    <ul className="achievements-list">
                      {character.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>暂无成就信息</p>
                  )}
                </div>
              </div>
            )}

            {/* 美·真如 - 相关视频 */}
            {activeTab === 'beauty' && (
              <div className="tab-panel fade-in">
                <h2 className="tab-panel-title">
                  <span className="title-text">相关视频</span>
                  <img src="/piying3.png" alt="" className="title-icon" />
                </h2>
                <div className="tab-panel-content">
                  <div className="video-wrapper">
                    {character.videoUrl.startsWith('http') ? (
                      <iframe
                        src={character.videoUrl}
                        title={`${character.name}的视频`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="video-iframe"
                        style={{ border: 'none' }}
                      ></iframe>
                    ) : (
                      <video
                        controls
                        className="video-player"
                      >
                        <source src={character.videoUrl} type="video/mp4" />
                        您的浏览器不支持视频播放
                      </video>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 返回首页按钮 - 独立于页脚 */}
      <div className="back-button-container">
        <Link to="/" className="back-button-main">
          返回首页
        </Link>
      </div>

      <footer className="detail-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">关于焕影清音</h3>
            <p className="footer-description">
              致力于传承和弘扬华县皮影艺术，记录传承人的故事，让传统文化焕发新的生命力。
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">联系我们</h3>
            <p className="footer-link">邮箱：contact@huanyingqingyin.com</p>
            <p className="footer-link">
              <a href="https://sxy.xaufe.edu.cn/" target="_blank" rel="noopener noreferrer" className="footer-anchor">西安财经大学商学院</a>
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">相关链接</h3>
            <p className="footer-link">
              <a href="https://www.ihchina.cn/art/detail/id/27982.html" target="_blank" rel="noopener noreferrer" className="footer-anchor">中国非物质文化遗产网</a>
            </p>
            <p className="footer-link">
              <a href="https://www.sxfycc.com/home/Index/library_detail.html?id=160" target="_blank" rel="noopener noreferrer" className="footer-anchor">陕西省非物质文化遗产网</a>
            </p>
            <p className="footer-link" style={{ marginTop: '15px' }}>制作人：陈笛</p>
            <p className="footer-link">艺术视觉：李商文昱</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-text">© 2025 焕影清音 - 传承华县皮影艺术</p>
        </div>
      </footer>
    </div>
  );
}

