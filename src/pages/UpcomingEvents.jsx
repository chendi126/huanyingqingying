import { Link } from 'react-router-dom';
import { upcomingEventsData } from '../data/upcomingEvents';
import '../styles/UpcomingEvents.css';

function UpcomingEvents() {
  // 点击活动项，打开外部链接
  const handleEventClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="upcoming-events-page">
      <div className="upcoming-events-container">
        {/* 返回首页按钮 */}
        <Link to="/" className="back-button">
          ← 返回首页
        </Link>

        {/* 页面标题 */}
        <header className="upcoming-events-header">
          <h1 className="upcoming-events-title">活动预告</h1>
          <p className="upcoming-events-subtitle">UPCOMING EVENTS</p>
        </header>

        {/* 活动列表 */}
        <main className="upcoming-events-list">
          {upcomingEventsData.map((event, index) => (
            <div key={event.id}>
              <article
                className="upcoming-event-item"
                onClick={() => handleEventClick(event.url)}
              >
                <div className="upcoming-event-item-header">
                  <h2 className="upcoming-event-item-title">{event.title}</h2>
                </div>
                {event.description && (
                  <p className="upcoming-event-item-description">{event.description}</p>
                )}
                <div className="upcoming-event-item-link">
                  查看详情 →
                </div>
              </article>
              {index < upcomingEventsData.length - 1 && <div className="upcoming-event-divider"></div>}
            </div>
          ))}
        </main>

        {/* 空状态 */}
        {upcomingEventsData.length === 0 && (
          <div className="upcoming-events-empty">
            <p>暂无活动预告</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingEvents;

