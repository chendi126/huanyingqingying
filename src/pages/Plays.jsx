import React from 'react';
import { useNavigate } from 'react-router-dom';
import { plays } from '../data/plays';
import '../styles/Plays.css';

function Plays() {
  const navigate = useNavigate();

  // 蜂窝布局配置
  const centerPlayId = 'play1'; // 西游记作为中心剧目
  const largeHexSize = 90; // 中心大六边形的半径
  const smallHexSize = 60; // 周围小六边形的半径

  // 六边形拼接布局计算 - 紧密相邻
  // 使用轴坐标系统 (axial coordinates) 来定位六边形
  const getHexPosition = (q, r, hexSize) => {
    const x = hexSize * Math.sqrt(3) * (q + r / 2);
    const y = hexSize * (3 / 2) * r;
    return { x, y };
  };

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

  // 定义蜂窝拼图布局 - 紧密拼接
  // 使用标准六边形网格坐标，确保边缘完全贴合
  const hexLayout = {
    'play1': { q: 0, r: 0, size: largeHexSize },     // 中心：西游记（大）
    'play2': { q: 2, r: -1, size: smallHexSize },    // 右上：三国演义
    'play3': { q: -2, r: 1, size: smallHexSize },    // 左下：白蛇传
    'play4': { q: 1, r: 1, size: smallHexSize },     // 右下：封神演义
    'play5': { q: -1, r: -1, size: smallHexSize },   // 左上：红楼梦
    'play6': { q: 0, r: 2, size: smallHexSize },     // 正下：水浒传
    'play7': { q: 2, r: 0, size: smallHexSize },     // 右：牡丹亭
    'play8': { q: -2, r: 0, size: smallHexSize },    // 左：长生殿
    'play9': { q: 0, r: -2, size: smallHexSize },    // 正上：桃花扇
    'play10': { q: 1, r: -2, size: smallHexSize },   // 右上角：窦娥冤
  };

  // 获取剧目的位置、大小和类别
  const getPlayLayout = (playId) => {
    const layout = hexLayout[playId];
    if (!layout) return { x: 0, y: 0, size: smallHexSize, category: 'drama' };

    const pos = getHexPosition(layout.q, layout.r, layout.size);
    return {
      ...pos,
      size: layout.size,
      category: playCategories[playId] || 'drama'
    };
  };

  // 处理剧目点击
  const handlePlayClick = (playId) => {
    navigate(`/plays/${playId}`);
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

      {/* 蜂窝网络图容器 */}
      <div className="network-container">
        <svg className="network-svg" viewBox="-500 -400 1000 800" preserveAspectRatio="xMidYMid meet">
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

          {/* 绘制蜂窝拼图节点 */}
          <g className="honeycomb-nodes">
            {plays.map((play) => {
              const layout = getPlayLayout(play.id);
              const isCenterPlay = play.id === centerPlayId;
              const category = layout.category;

              // 根据六边形大小计算顶点
              const size = layout.size;
              const h = size; // 六边形的半径
              const w = h * Math.sqrt(3) / 2; // 六边形的宽度的一半

              // 六边形的6个顶点（尖角朝上）
              const hexPoints = [
                `0,${-h}`,
                `${w},${-h/2}`,
                `${w},${h/2}`,
                `0,${h}`,
                `${-w},${h/2}`,
                `${-w},${-h/2}`
              ].join(' ');

              // 内部小六边形（装饰用）
              const innerSize = size * 0.85;
              const innerH = innerSize;
              const innerW = innerH * Math.sqrt(3) / 2;
              const innerHexPoints = [
                `0,${-innerH}`,
                `${innerW},${-innerH/2}`,
                `${innerW},${innerH/2}`,
                `0,${innerH}`,
                `${-innerW},${innerH/2}`,
                `${-innerW},${-innerH/2}`
              ].join(' ');

              // 根据类别选择渐变
              const gradientId = isCenterPlay ? 'centerGradient' : `${category}Gradient`;

              return (
                <g
                  key={play.id}
                  transform={`translate(${layout.x}, ${layout.y})`}
                  className={`hex-node ${isCenterPlay ? 'center-node' : 'small-node'} category-${category}`}
                  onClick={() => handlePlayClick(play.id)}
                  filter="url(#shadow)"
                >
                  {/* 外层阴影六边形 */}
                  <polygon
                    points={hexPoints}
                    className="hex-shadow"
                    fill="rgba(0,0,0,0.1)"
                    transform="translate(2, 4)"
                  />

                  {/* 主背景六边形 - 渐变填充 */}
                  <polygon
                    points={hexPoints}
                    fill={`url(#${gradientId})`}
                    className="hex-background"
                  />

                  {/* 纹理图案层 */}
                  <polygon
                    points={hexPoints}
                    fill="url(#cloudPattern)"
                    opacity="0.4"
                  />

                  {/* 内部装饰六边形 */}
                  <polygon
                    points={innerHexPoints}
                    className="hex-inner-border"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1"
                    strokeDasharray={isCenterPlay ? "5,3" : "3,2"}
                  />

                  {/* 主边框 */}
                  <polygon
                    points={hexPoints}
                    className={`hex-border ${isCenterPlay ? 'center-border' : 'small-border'}`}
                    fill="none"
                  />

                  {/* 中心节点特殊装饰 - 双线边框 */}
                  {isCenterPlay && (
                    <>
                      <polygon
                        points={hexPoints}
                        fill="none"
                        stroke="#d4145a"
                        strokeWidth="2"
                        opacity="0.6"
                        transform="scale(0.95)"
                      />
                      {/* 角落装饰点 */}
                      <circle cx="0" cy={-h} r="4" fill="#d4145a" opacity="0.8" />
                      <circle cx={w} cy={-h/2} r="4" fill="#d4145a" opacity="0.8" />
                      <circle cx={w} cy={h/2} r="4" fill="#d4145a" opacity="0.8" />
                      <circle cx="0" cy={h} r="4" fill="#d4145a" opacity="0.8" />
                      <circle cx={-w} cy={h/2} r="4" fill="#d4145a" opacity="0.8" />
                      <circle cx={-w} cy={-h/2} r="4" fill="#d4145a" opacity="0.8" />
                    </>
                  )}

                  {/* 几何装饰线 - 对角线 */}
                  {!isCenterPlay && (
                    <g opacity="0.2">
                      <line x1={-w*0.5} y1={-h*0.3} x2={w*0.5} y2={h*0.3} stroke="white" strokeWidth="1" />
                      <line x1={-w*0.5} y1={h*0.3} x2={w*0.5} y2={-h*0.3} stroke="white" strokeWidth="1" />
                    </g>
                  )}

                  {/* 剧目名称 - 竖排 */}
                  <text
                    className={`hex-name ${isCenterPlay ? 'center-name' : 'small-name'}`}
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

                  {/* 角色数量标签 */}
                  {!isCenterPlay && (
                    <g transform={`translate(${w * 0.6}, ${h * 0.6})`}>
                      <circle r="12" fill="rgba(255,255,255,0.9)" />
                      <text
                        className="char-count"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#333"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {play.characters.length}
                      </text>
                    </g>
                  )}

                  {/* 类别图标装饰 */}
                  {!isCenterPlay && (
                    <text
                      className="category-icon"
                      x="0"
                      y={h * 0.7}
                      textAnchor="middle"
                      fontSize="16"
                      opacity="0.6"
                    >
                      {category === 'mythology' && '⚡'}
                      {category === 'history' && '⚔️'}
                      {category === 'romance' && '💕'}
                      {category === 'drama' && '🎭'}
                    </text>
                  )}
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

