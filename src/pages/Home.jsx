import { Link } from 'react-router-dom';
import { characters } from '../data/characters';
import ThemeSwitcher from '../components/ThemeSwitcher';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      <header className="header">
        <ThemeSwitcher />
        <div className="header-content">
          <h1 className="title">焕影清音</h1>
          <p className="subtitle">——华县皮影的前世今生</p>
        </div>
      </header>

      <main className="main-content">
        <section className="intro-section">
          <h2>传统艺术瑰宝</h2>
          <p>
            华县皮影戏是中国传统民间艺术的重要组成部分，已有数百年的历史。
            它以其精美的造型、生动的表演和优美的音乐，吸引了无数观众。
            这里介绍的是华县皮影戏的杰出传承人和艺术家。
          </p>
        </section>

        <section className="characters-section">
          <h2>杰出传承人</h2>
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

