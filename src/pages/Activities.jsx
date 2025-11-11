import { Link } from 'react-router-dom';
import { activitiesData } from '../data/activities';
import '../styles/Activities.css';

function Activities() {
  // 格式化日期：2024-10-01 → 2024 // 10 / 01
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${year} // ${month} / ${day}`;
  };

  // 点击活动项，打开外部链接
  const handleActivityClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="activities-page">
      <div className="activities-container">
        {/* 返回首页按钮 */}
        <Link to="/" className="back-button">
          ← 返回首页
        </Link>

        {/* 页面标题 */}
        <header className="activities-header">
          <h1 className="activities-title">文化动态</h1>
          <p className="activities-subtitle">UPCOMING EVENTS</p>
        </header>

        {/* 活动列表 */}
        <main className="activities-list">
          {activitiesData.map((activity, index) => (
            <div key={activity.id}>
              <article
                className="activity-item"
                onClick={() => handleActivityClick(activity.url)}
              >
                <div className="activity-item-header">
                  <h2 className="activity-item-title">{activity.title}</h2>
                  <span className="activity-item-date">{formatDate(activity.date)}</span>
                </div>
                <p className="activity-item-location">{activity.location}</p>
                <p className="activity-item-description">{activity.description}</p>
                <div className="activity-item-link">
                  查看详情 →
                </div>
              </article>
              {index < activitiesData.length - 1 && <div className="activity-divider"></div>}
            </div>
          ))}
        </main>

        {/* 空状态 */}
        {activitiesData.length === 0 && (
          <div className="activities-empty">
            <p>暂无活动预告</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;

