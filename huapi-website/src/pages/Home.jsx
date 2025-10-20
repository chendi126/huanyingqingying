import { Link } from 'react-router-dom';
import { characters } from '../data/characters';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      <header className="header">
        <div className="header-content">
          <h1 className="title">焕影清音</h1>
          <p className="subtitle">华县皮影的前世今生</p>
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
        <p>&copy; 2024 华县皮影文化传承中心 | 焕影清音</p>
      </footer>
    </div>
  );
}

