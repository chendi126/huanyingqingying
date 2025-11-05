import { Link } from 'react-router-dom';
import { useState } from 'react';
import { characters } from '../data/characters';
import '../styles/Home.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="home">
      {/* 顶部导航栏 */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/piying1.png" alt="焕影清音 Logo" className="navbar-logo" />
          <h1 className="navbar-title">焕影清音</h1>
        </div>
        <div className="navbar-right">
          <button className="settings-button" aria-label="设置">
            <img src="/ic_public_settings.svg" alt="设置" className="settings-icon" />
          </button>
        </div>
      </nav>

      {/* 搜索框 */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="搜索网站内容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" aria-label="搜索">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>

      <main className="main-content">
        {/* 4个主要内容卡片 */}
        <section className="content-cards-section">
          {/* 第一张卡片：咫尺之间·新闻动态 */}
          <div className="content-card">
            <h2 className="content-card-title">咫尺之间·新闻动态</h2>
            <div className="content-card-body">
              <div className="news-list">
                <div className="news-item">
                  <div className="news-item-content">
                    <h3 className="news-title-cn">最新资讯</h3>
                    <h3 className="news-title-en">LATEST NEWS</h3>
                  </div>
                  <div className="news-item-line"></div>
                </div>
                <div className="news-item">
                  <div className="news-item-content">
                    <h3 className="news-title-cn">活动预告</h3>
                    <h3 className="news-title-en">UPCOMING EVENTS</h3>
                  </div>
                  <div className="news-item-line"></div>
                </div>
                <div className="news-item">
                  <div className="news-item-content">
                    <h3 className="news-title-cn">文化动态</h3>
                    <h3 className="news-title-en">CULTURAL UPDATES</h3>
                  </div>
                  <div className="news-item-line"></div>
                </div>
                <div className="news-item">
                  <div className="news-item-content">
                    <h3 className="news-title-cn">团队报道</h3>
                    <h3 className="news-title-en">TEAM REPORTS</h3>
                  </div>
                  <div className="news-item-line"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 第二张卡片：匠心独运·非遗传承人 */}
          <div className="content-card">
            <h2 className="content-card-title">匠心独运·非遗传承人</h2>
            <div className="content-card-body">
              <div className="characters-grid">
                {characters.map((character) => (
                  <Link
                    key={character.id}
                    to={`/character/${character.id}`}
                    className="character-card-link"
                  >
                    <div className="character-card">
                      <div className="card-image-wrapper">
                        <img
                          src={character.thumbnail}
                          alt={character.name}
                          className="card-image"
                        />
                      </div>
                      <div className="card-content">
                        <h3 className="card-name">{character.name}</h3>
                        <p className="card-title">{character.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 第三张卡片：千古流芳·经典剧目 */}
          <div className="content-card">
            <h2 className="content-card-title">千古流芳·经典剧目</h2>
            <div className="content-card-body">
              <Link to="/plays" className="plays-simple-link">
                点击查看更多....&gt;
              </Link>
            </div>
          </div>

          {/* 第四张卡片：薪火相传·陕西特色 */}
          <div className="content-card">
            <h2 className="content-card-title">薪火相传·陕西特色</h2>
            <div className="content-card-body">
              <p className="content-card-description">陕西皮影特色内容即将上线...</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">关于焕影清音</h3>
            <p className="footer-description">
              致力于传承和弘扬华县皮影艺术，记录传承人的故事，让传统文化焕发新的生命力。
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">联系我们</h3>
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

