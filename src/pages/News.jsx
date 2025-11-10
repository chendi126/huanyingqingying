import { useState } from 'react';
import { Link } from 'react-router-dom';
import { newsData } from '../data/news';
import '../styles/News.css';

function News() {
  const [activeTab, setActiveTab] = useState('最新');

  // 标签配置
  const tabs = ['最新', '央级媒体', '西财商学院', '西财校团委', '灯影胡声'];

  // 根据选中的标签筛选新闻
  const getFilteredNews = () => {
    if (activeTab === '最新') {
      // 「最新」标签：从每个分类中各选1条混合展示
      const categories = ['央级媒体', '西财商学院', '西财校团委', '灯影胡声'];
      const mixedNews = [];
      categories.forEach(cat => {
        const categoryNews = newsData.filter(news => news.category === cat);
        if (categoryNews.length > 0) {
          mixedNews.push(categoryNews[0]); // 取每个分类的第一条
        }
      });
      return mixedNews;
    } else {
      // 其他标签：显示对应分类的所有新闻
      return newsData.filter(news => news.category === activeTab);
    }
  };

  const filteredNews = getFilteredNews();

  // 处理外部链接点击
  const handleNewsClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 格式化日期：2025-02-15 -> 2025 // 02 / 15
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${year} // ${month} / ${day}`;
  };

  return (
    <div className="news-page">
      <div className="news-container">
        {/* 返回首页按钮 */}
        <Link to="/" className="back-button">
          ← 返回首页
        </Link>

        {/* 标签导航栏 */}
        <nav className="news-tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`news-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </nav>

        {/* 新闻列表 */}
        <main className="news-list">
          {filteredNews.map((news, index) => (
            <div key={news.id}>
              <article
                className="news-item"
                onClick={() => handleNewsClick(news.url)}
              >
                <div className="news-item-left">
                  <h3 className="news-item-title">{news.title}</h3>
                  <p className="news-item-source">来源：{news.source}</p>
                </div>
                <div className="news-item-right">
                  <span className="news-item-date">{formatDate(news.date)}</span>
                </div>
              </article>
              {index < filteredNews.length - 1 && <div className="news-divider"></div>}
            </div>
          ))}
        </main>

        {/* 空状态 */}
        {filteredNews.length === 0 && (
          <div className="news-empty">
            <p>暂无相关资讯</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;

