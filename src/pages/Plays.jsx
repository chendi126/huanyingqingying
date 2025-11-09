import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { plays } from '../data/plays';
import '../styles/Plays.css';

function Plays() {
  const navigate = useNavigate();
  const [clickedPlayId, setClickedPlayId] = useState(null);

  // 正方形布局配置
  const centerPlayId = 'play1'; // 西游记作为中心剧目
  const largeSquareSize = 140; // 中心大正方形的边长
  const smallSquareSize = 90; // 周围小正方形的边长

  // 剧目分类（用于不同的视觉样式）
  const playCategories = {
    'play1': 'mythology', // 西游记 - 神话
    'play2': 'history',   // 三国演义 - 历史
    'play3': 'romance',   // 白蛇传 - 爱情
    'play4': 'mythology', // 封神演义 - 神话
    'play5': 'romance',   // 红楼梦 - 爱情
    'play6': 'history',   // 水浒传 - 历史
    'play7': 'romance',   // 牡丹亭 - 爱情
    'play8': 'romance',   // 长生殿 - 爱情
    'play9': 'history',   // 桃花扇 - 历史
    'play10': 'drama',    // 窦娥冤 - 戏剧
  };

  // 定义正方形分散布局 - 随机分散但有序
  const squareLayout = {
    'play1': { x: 0, y: 0, size: largeSquareSize },        // 中心：西游记（大）
    'play2': { x: 220, y: -120, size: smallSquareSize },   // 右上：三国演义
    'play3': { x: -200, y: 100, size: smallSquareSize },   // 左下：白蛇传
    'play4': { x: 180, y: 130, size: smallSquareSize },    // 右下：封神演义
    'play5': { x: -220, y: -100, size: smallSquareSize },  // 左上：红楼梦
    'play6': { x: 50, y: 180, size: smallSquareSize },     // 下：水浒传
    'play7': { x: 240, y: 20, size: smallSquareSize },     // 右：牡丹亭
    'play8': { x: -240, y: 0, size: smallSquareSize },     // 左：长生殿
    'play9': { x: -80, y: -180, size: smallSquareSize },   // 上：桃花扇
    'play10': { x: 100, y: -200, size: smallSquareSize },  // 右上角：窦娥冤
  };

  // 获取剧目的位置、大小和类别
  const getPlayLayout = (playId) => {
    const layout = squareLayout[playId];
    if (!layout) return { x: 0, y: 0, size: smallSquareSize, category: 'drama' };

    return {
      x: layout.x,
      y: layout.y,
      size: layout.size,
      category: playCategories[playId] || 'drama'
    };
  };

  // 处理剧目点击 - 添加渐隐放大动画
  const handlePlayClick = (playId) => {
    setClickedPlayId(playId);
    // 等待动画完成后跳转
    setTimeout(() => {
      navigate(`/plays/${playId}`);
    }, 600); // 600ms 动画时间
  };

  return (
    <div className="plays-page">
      {/* 顶部导航栏 */}
      <header className="plays-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-arrow">←</span>
        </button>
        <div className="header-content">
          <h1 className="plays-title">剧目网络</h1>
          <p className="plays-subtitle">CLASSIC PLAY NETWORK</p>
        </div>
      </header>

      {/* 正方形网络图容器 */}
      <div className="network-container">
        <svg className="network-svg" viewBox="-350 -280 700 560" preserveAspectRatio="xMidYMid meet">
          {/* 定义渐变、图案和滤镜 */}
          <defs>
            {/* 神话类渐变 - 金色系 */}
            <radialGradient id="mythologyGradient">
              <stop offset="0%" stopColor="#fff9e6" />
              <stop offset="50%" stopColor="#ffe4b3" />
              <stop offset="100%" stopColor="#ffd480" />
            </radialGradient>

            {/* 历史类渐变 - 蓝色系 */}
            <radialGradient id="historyGradient">
              <stop offset="0%" stopColor="#e6f3ff" />
              <stop offset="50%" stopColor="#b3d9ff" />
              <stop offset="100%" stopColor="#80bfff" />
            </radialGradient>

            {/* 爱情类渐变 - 粉红色系 */}
            <radialGradient id="romanceGradient">
              <stop offset="0%" stopColor="#ffe6f0" />
              <stop offset="50%" stopColor="#ffb3d9" />
              <stop offset="100%" stopColor="#ff80bf" />
            </radialGradient>

            {/* 戏剧类渐变 - 紫色系 */}
            <radialGradient id="dramaGradient">
              <stop offset="0%" stopColor="#f0e6ff" />
              <stop offset="50%" stopColor="#d9b3ff" />
              <stop offset="100%" stopColor="#bf80ff" />
            </radialGradient>

            {/* 中心大六边形渐变 - 特殊金红色 */}
            <radialGradient id="centerGradient">
              <stop offset="0%" stopColor="#fff5f5" />
              <stop offset="30%" stopColor="#ffe0e0" />
              <stop offset="70%" stopColor="#ffcccc" />
              <stop offset="100%" stopColor="#ff9999" />
            </radialGradient>

            {/* 画布背景图案 - huabu.jpg */}
            <pattern id="huabuPattern" x="0" y="0" width="1" height="1" patternContentUnits="objectBoundingBox">
              <image href="/huabu.jpg" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" />
            </pattern>

            {/* 红色渐变 - 用于左上角 L 形装饰线条 */}
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4145a" />
              <stop offset="50%" stopColor="#e85d9f" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>

            {/* 深红色渐变 - 用于右下角 L 形装饰线条 */}
            <linearGradient id="darkRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b0000" />
              <stop offset="50%" stopColor="#a52a2a" />
              <stop offset="100%" stopColor="#b22222" />
            </linearGradient>

            {/* 传统纹理图案 - 云纹 */}
            <pattern id="cloudPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="3" fill="rgba(255,255,255,0.3)" />
              <circle cx="30" cy="30" r="3" fill="rgba(255,255,255,0.3)" />
              <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.2)" />
            </pattern>

            {/* 几何线条图案 */}
            <pattern id="linePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="20" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="20" y1="0" x2="0" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            </pattern>

            {/* 发光滤镜 */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* 阴影滤镜 */}
            <filter id="shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3"/>
            </filter>

            {/* 内阴影效果 */}
            <filter id="innerShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 绘制连接线 - 从中心到各个剧目 */}
          <g className="connection-lines">
            {plays.map((play) => {
              if (play.id === centerPlayId) return null; // 跳过中心剧目
              const layout = getPlayLayout(play.id);
              return (
                <line
                  key={`line-${play.id}`}
                  x1="0"
                  y1="0"
                  x2={layout.x}
                  y2={layout.y}
                  stroke="rgba(139, 0, 0, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="connection-line"
                />
              );
            })}
          </g>

          {/* 绘制正方形节点 */}
          <g className="square-nodes">
            {plays.map((play) => {
              const layout = getPlayLayout(play.id);
              const isCenterPlay = play.id === centerPlayId;
              const isClicked = clickedPlayId === play.id;
              const category = layout.category;

              // 正方形大小
              const size = layout.size;
              const halfSize = size / 2;

              // L形装饰边框的长度（正方形边长的25%）
              const cornerLength = size * 0.25;

              return (
                <g
                  key={play.id}
                  transform={`translate(${layout.x}, ${layout.y})`}
                  className={`square-node ${isCenterPlay ? 'center-node' : 'small-node'} ${isClicked ? 'clicked' : ''} category-${category}`}
                  onClick={() => handlePlayClick(play.id)}
                >
                  {/* 主背景正方形 - 透明 + 模糊效果 */}
                  <rect
                    x={-halfSize}
                    y={-halfSize}
                    width={size}
                    height={size}
                    fill="rgba(255, 255, 255, 0.2)"
                    className="square-background"
                  />

                  {/* 左上角直角边框装饰 - 深红色渐变 */}
                  <g className="corner-decoration">
                    <polyline
                      points={`${-halfSize},${-halfSize + cornerLength} ${-halfSize},${-halfSize} ${-halfSize + cornerLength},${-halfSize}`}
                      fill="none"
                      stroke="url(#darkRedGradient)"
                      strokeWidth="3"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      className="corner-border top-left"
                    />
                  </g>

                  {/* 右下角直角边框装饰 - 深红色渐变 */}
                  <g className="corner-decoration">
                    <polyline
                      points={`${halfSize},${halfSize - cornerLength} ${halfSize},${halfSize} ${halfSize - cornerLength},${halfSize}`}
                      fill="none"
                      stroke="url(#darkRedGradient)"
                      strokeWidth="3"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      className="corner-border bottom-right"
                    />
                  </g>

                  {/* 剧目名称 - 竖排 */}
                  <text
                    className={`square-name ${isCenterPlay ? 'center-name' : 'small-name'}`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {play.name.split('').map((char, i) => (
                      <tspan
                        key={i}
                        x="0"
                        dy={i === 0 ? `-${(play.name.length - 1) * 0.5}em` : '1em'}
                      >
                        {char}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* 底部说明 */}
      <footer className="plays-footer">
        <div className="footer-content">
          <p className="footer-text">点击剧目节点，探索角色关系网络</p>
          <p className="footer-subtext">CLICK TO EXPLORE CHARACTER NETWORK</p>
        </div>
      </footer>
    </div>
  );
}

export default Plays;

