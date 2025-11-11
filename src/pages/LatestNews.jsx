import { Link } from 'react-router-dom';
import { latestNewsData } from '../data/latestNews';
import '../styles/LatestNews.css';

function LatestNews() {
  // 点击资讯项，打开外部链接
  const handleNewsClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="latest-news-page">
      <div className="latest-news-container">
        {/* 返回首页按钮 */}
        <Link to="/" className="back-button">
          ← 返回首页
        </Link>

        {/* 页面标题 */}
        <header className="latest-news-header">
          <h1 className="latest-news-title">最新资讯</h1>
          <p className="latest-news-subtitle">LATEST NEWS</p>
        </header>

        {/* 资讯列表 */}
        <main className="latest-news-list">
          {latestNewsData.map((newsItem, index) => (
            <div key={newsItem.id}>
              <article
                className="latest-news-item"
                onClick={() => handleNewsClick(newsItem.url)}
              >
                <div className="latest-news-item-header">
                  <h2 className="latest-news-item-title">{newsItem.title}</h2>
                </div>
                {newsItem.description && (
                  <p className="latest-news-item-description">{newsItem.description}</p>
                )}
                <div className="latest-news-item-link">
                  查看详情 →
                </div>
              </article>
              {index < latestNewsData.length - 1 && <div className="latest-news-divider"></div>}
            </div>
          ))}
        </main>

        {/* 空状态 */}
        {latestNewsData.length === 0 && (
          <div className="latest-news-empty">
            <p>暂无最新资讯</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LatestNews;

