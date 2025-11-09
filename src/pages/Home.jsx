import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { characters } from '../data/characters';
import { plays } from '../data/plays';
import ThemeSwitcher from '../components/ThemeSwitcher';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCharacters, setShowAllCharacters] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef(null);

  // 快捷搜索词
  const quickSearchTerms = [
    '党飞华',
    '张江斌',
    '西游记',
    '孙悟空',
    '封神演义',
    '三国演义',
    '皮影传承',
    '老腔艺术'
  ];

  // 根据展开状态决定显示的人物数量
  const displayedCharacters = showAllCharacters ? characters : characters.slice(0, 2);

  // 点击外部关闭搜索建议
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 搜索功能
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [];
    const lowerQuery = query.toLowerCase();

    // 搜索传承人
    characters.forEach((char) => {
      if (
        char.name.toLowerCase().includes(lowerQuery) ||
        char.title.toLowerCase().includes(lowerQuery) ||
        char.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'character',
          id: char.id,
          name: char.name,
          subtitle: char.title,
          path: `/character/${char.id}`
        });
      }
    });

    // 搜索剧目
    plays.forEach((play) => {
      if (
        play.name.toLowerCase().includes(lowerQuery) ||
        play.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'play',
          id: play.id,
          name: play.name,
          subtitle: play.nameEn,
          path: `/plays/${play.id}`
        });
      }

      // 搜索剧目中的角色
      play.characters.forEach((char) => {
        if (
          char.name.toLowerCase().includes(lowerQuery) ||
          char.role.toLowerCase().includes(lowerQuery) ||
          char.description.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            type: 'playCharacter',
            id: char.id,
            name: char.name,
            subtitle: `${play.name} - ${char.role}`,
            path: `/characters/${char.id}`
          });
        }
      });
    });

    setSearchResults(results);
  };

  // 处理搜索输入
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
    if (value.trim()) {
      setShowSearchSuggestions(true);
    }
  };

  // 处理搜索框聚焦
  const handleSearchFocus = () => {
    setShowSearchSuggestions(true);
  };

  // 处理快捷搜索词点击
  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    performSearch(term);
  };

  // 处理搜索结果点击
  const handleResultClick = (path) => {
    setShowSearchSuggestions(false);
    setSearchQuery('');
    setSearchResults([]);
    navigate(path);
  };

  // 处理搜索按钮点击
  const handleSearchSubmit = () => {
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0].path);
    }
  };

  return (
    <div className="home">
      {/* 顶部导航栏 */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/piying1.png" alt="焕影清音 Logo" className="navbar-logo" />
          <h1 className="navbar-title">焕影清音</h1>
        </div>
        <div className="navbar-right">
          <ThemeSwitcher />
        </div>
      </nav>

      {/* 搜索框 */}
      <div className="search-container" ref={searchContainerRef}>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="搜索传承人、剧目、角色..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
          <button className="search-button" aria-label="搜索" onClick={handleSearchSubmit}>
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        {/* 搜索建议下拉框 */}
        {showSearchSuggestions && (
          <div className="search-suggestions">
            {/* 快捷搜索词 */}
            {!searchQuery && (
              <div className="quick-search-section">
                <div className="quick-search-title">快捷搜索</div>
                <div className="quick-search-tags">
                  {quickSearchTerms.map((term, index) => (
                    <button
                      key={index}
                      className="quick-search-tag"
                      onClick={() => handleQuickSearch(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 搜索结果 */}
            {searchQuery && searchResults.length > 0 && (
              <div className="search-results-section">
                <div className="search-results-title">搜索结果 ({searchResults.length})</div>
                <div className="search-results-list">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="search-result-item"
                      onClick={() => handleResultClick(result.path)}
                    >
                      <img
                        src={
                          result.type === 'character' ? '/piying1.png' :
                          result.type === 'play' ? '/piying2.png' :
                          '/piying3.png'
                        }
                        alt="图标"
                        className="search-result-icon"
                      />
                      <div className="search-result-content">
                        <div className="search-result-name">{result.name}</div>
                        <div className="search-result-subtitle">{result.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 无搜索结果 */}
            {searchQuery && searchResults.length === 0 && (
              <div className="no-results">
                <img src="/piying1.png" alt="搜索" className="no-results-icon" />
                <div className="no-results-text">未找到相关内容</div>
                <div className="no-results-hint">试试搜索：传承人、剧目或角色名称</div>
              </div>
            )}
          </div>
        )}
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
              <div className="characters-list">
                {displayedCharacters.map((character) => (
                  <Link
                    key={character.id}
                    to={`/character/${character.id}`}
                    className="character-item-link"
                  >
                    <div className="character-item">
                      <div className="character-item-content">
                        <h3 className="character-name-cn">{character.name}</h3>
                        <p className="character-title-desc">{character.title}</p>
                      </div>
                      <div className="character-item-line"></div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 查看更多/收起链接 */}
              <div className="view-more-container">
                <div
                  className="view-more-link"
                  onClick={() => setShowAllCharacters(!showAllCharacters)}
                >
                  <div className="view-more-text">
                    {showAllCharacters ? '收起' : '点击查看更多'}
                  </div>
                  <div className="view-more-arrow">
                    {showAllCharacters ? '∧' : '∨'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 第三张卡片：千古流芳·经典剧目 */}
          <div className="content-card">
            <h2 className="content-card-title">千古流芳·经典剧目</h2>
            <div className="content-card-body">
              <div className="news-list">
                <Link to="/plays" className="news-item plays-entrance-item">
                  <div className="news-item-content">
                    <h3 className="news-title-cn">进入剧目厅</h3>
                    <h3 className="news-title-en">ENTER THEATER</h3>
                  </div>
                  <div className="news-item-line"></div>
                </Link>
              </div>
            </div>
          </div>

          {/* 第四张卡片：薪火相传·陕西特色 */}
          <div className="content-card">
            <h2 className="content-card-title">薪火相传·陕西特色</h2>
            <div className="content-card-body">
              <div className="news-list">
                <a
                  href="https://xhslink.com/m/AiN3qMRA1uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-item xiaohongshu-item"
                >
                  <div className="news-item-content">
                    <h3 className="news-title-cn">访问我们的店</h3>
                    <h3 className="news-title-en">VISIT OUR STORE</h3>
                  </div>
                  <div className="news-item-line"></div>
                </a>
              </div>
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

      {/* 底部社交媒体标签栏 */}
      <div className="social-bar">
        <a
          href="https://mp.weixin.qq.com/s/qZONznKsVhAIj1KhpADvzg?click_id=7"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="微信公众号"
        >
          <img src="/微信.svg" alt="微信" className="social-icon" />
        </a>
        <a
          href="https://weibo.com/u/1989499372"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="微博"
        >
          <img src="/微博.svg" alt="微博" className="social-icon" />
        </a>
        <a
          href="https://xhslink.com/m/AiN3qMRA1uz"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="小红书"
        >
          <img src="/小红书.svg" alt="小红书" className="social-icon" />
        </a>
        <a
          href="https://v.douyin.com/Yos09TWq2aY/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="抖音"
        >
          <img src="/抖音.svg" alt="抖音" className="social-icon" />
        </a>
        <a
          href="https://b23.tv/mxQJ992"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="哔哩哔哩"
        >
          <img src="/BILIBILI.svg" alt="哔哩哔哩" className="social-icon" />
        </a>
      </div>
    </div>
  );
}

