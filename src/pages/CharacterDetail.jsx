import { useParams, Link } from 'react-router-dom';
import { characters } from '../data/characters';
import ThemeSwitcher from '../components/ThemeSwitcher';
import '../styles/CharacterDetail.css';

export default function CharacterDetail() {
  const { id } = useParams();
  const character = characters.find((c) => c.id === parseInt(id));

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

  return (
    <div className="detail-container">
      <header className="detail-header">
        <ThemeSwitcher />
        <div className="header-title-wrapper">
          <h1 className="header-title">焕影清音</h1>
          <p className="header-subtitle">——华县皮影的前世今生</p>
        </div>
      </header>

      <main className="detail-content">
        <div className="detail-header-section">
          <h1 className="detail-name">
            <span className="name-text">{character.name}</span>
            <img src="/jytongbao5.png" alt="" className="name-icon" />
          </h1>
          <p className="detail-title">{character.title}</p>
        </div>

        <div className="detail-main-layout">
          <div className="description-section">
            <div className="description-container">
              <div className="description-left">
                <h2 className="section-title">
                  <span className="title-text">人物介绍</span>
                  <img src="/piying1.png" alt="" className="title-icon" />
                </h2>
                <div className="description-text">
                  {character.description.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="description-right">
                <div className="detail-hero">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="detail-image"
                  />
                </div>
              </div>
            </div>
          </div>

          {character.achievements && character.achievements.length > 0 && (
            <section className="achievements-section">
              <h2 className="section-title">
                <span className="title-text">主要成就</span>
                <img src="/piying2.png" alt="" className="title-icon" />
              </h2>
              <ul className="achievements-list">
                {character.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="video-section">
            <h2 className="section-title">
              <span className="title-text">相关视频</span>
              <img src="/piying3.png" alt="" className="title-icon" />
            </h2>
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
          </section>
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
            <p className="footer-link">电话：+86 123-4567-8900</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">相关链接</h3>
            <p className="footer-link">
              <a href="#" className="footer-anchor">华县文化馆</a>
            </p>
            <p className="footer-link">
              <a href="#" className="footer-anchor">非物质文化遗产网</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-text">© 2025 焕影清音 - 传承华县皮影艺术</p>
        </div>
      </footer>
    </div>
  );
}

