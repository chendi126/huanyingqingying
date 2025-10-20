import { useParams, Link } from 'react-router-dom';
import { characters } from '../data/characters';
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
        <Link to="/" className="back-button">
          ← 返回首页
        </Link>
      </header>

      <main className="detail-content">
        <div className="detail-header-section">
          <h1 className="detail-name">{character.name}</h1>
          <p className="detail-title">{character.title}</p>
        </div>

        <div className="detail-main-layout">
          <div className="description-section">
            <div className="description-container">
              <div className="description-left">
                <h2>人物介绍</h2>
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
              <h2>主要成就</h2>
              <ul className="achievements-list">
                {character.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="video-section">
            <h2>相关视频</h2>
            <div className="video-wrapper">
              {character.videoUrl.startsWith('http') ? (
                <iframe
                  width="100%"
                  height="400"
                  src={character.videoUrl}
                  title={`${character.name}的视频`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  width="100%"
                  height="400"
                  controls
                  style={{ backgroundColor: '#000' }}
                >
                  <source src={character.videoUrl} type="video/mp4" />
                  您的浏览器不支持视频播放
                </video>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="detail-footer">
        <Link to="/" className="back-button-footer">
          返回首页
        </Link>
      </footer>
    </div>
  );
}

