import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlayById } from '../data/plays';
import '../styles/PlayDetail.css';

function PlayDetail() {
  const { playId } = useParams();
  const navigate = useNavigate();
  const play = getPlayById(playId);

  if (!play) {
    return (
      <div className="play-detail-page">
        <div className="error-message">剧目未找到</div>
      </div>
    );
  }

  // 蜂窝网格布局 - 使用轴坐标系统
  const centerHexSize = 70; // 中心六边形（剧目）
  const charHexSize = 50;   // 角色六边形（更紧凑）

  // 轴坐标转换为笛卡尔坐标
  const axialToCartesian = (q, r, size) => {
    const x = size * Math.sqrt(3) * (q + r / 2);
    const y = size * (3 / 2) * r;
    return { x, y };
  };

  // 生成六边形顶点
  const getHexPoints = (size) => {
    const h = size;
    const w = size * Math.sqrt(3) / 2;
    return [
      `0,${-h}`,
      `${w},${-h / 2}`,
      `${w},${h / 2}`,
      `0,${h}`,
      `${-w},${h / 2}`,
      `${-w},${-h / 2}`
    ].join(' ');
  };

  // 为角色分配蜂窝网格位置（紧密排列）
  const getCharacterLayout = () => {
    const charCount = play.characters.length;
    const layouts = {
      1: [{ q: 1, r: 0 }],
      2: [{ q: 1, r: 0 }, { q: -1, r: 0 }],
      3: [{ q: 1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: -1 }],
      4: [{ q: 1, r: 0 }, { q: 0, r: 1 }, { q: -1, r: 0 }, { q: 0, r: -1 }],
      5: [{ q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: 1 }, { q: -1, r: 1 }, { q: 0, r: -1 }],
      6: [{ q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: 1 }, { q: -1, r: 1 }, { q: -1, r: 0 }, { q: 0, r: -1 }],
    };

    return layouts[Math.min(charCount, 6)] || layouts[6];
  };

  const characterLayout = getCharacterLayout();

  // 处理角色点击
  const handleCharacterClick = (charId) => {
    navigate(`/characters/${charId}`);
  };

  return (
    <div className="play-detail-page">
      {/* 顶部导航栏 */}
      <div className="play-detail-header">
        <button className="back-button" onClick={() => navigate('/plays')}>
          <span className="back-arrow">←</span>
        </button>
        <div className="play-detail-title-section">
          <h1 className="play-detail-title">{play.name}</h1>
          <div className="play-detail-subtitle">{play.nameEn}</div>
        </div>
        <button className="home-button" onClick={() => navigate('/')}>
          <span className="home-icon">🏠</span>
        </button>
      </div>

      {/* 角色网络图容器 */}
      <div className="character-network-container">
        <svg className="character-network-svg" viewBox="-300 -300 600 600" preserveAspectRatio="xMidYMid meet">
          {/* 定义渐变 */}
          <defs>
            {/* 中心六边形渐变 */}
            <radialGradient id="centerPlayGradient">
              <stop offset="0%" stopColor="#fff5f5" />
              <stop offset="30%" stopColor="#ffe0e0" />
              <stop offset="70%" stopColor="#ffcccc" />
              <stop offset="100%" stopColor="#ff9999" />
            </radialGradient>

            {/* 角色六边形渐变 */}
            <radialGradient id="charGradient">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffe6f0" />
            </radialGradient>

            {/* 发光滤镜 */}
            <filter id="charGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 中心剧目六边形 */}
          <g className="center-play-hex" style={{ pointerEvents: 'none' }}>
            {/* 六边形背景 */}
            <polygon
              points={getHexPoints(centerHexSize)}
              fill="url(#centerPlayGradient)"
              className="center-hex-bg"
            />

            {/* 六边形边框 */}
            <polygon
              points={getHexPoints(centerHexSize)}
              fill="none"
              stroke="#d4145a"
              strokeWidth="4"
              className="center-hex-border"
            />

            {/* 剧目名称（竖排） */}
            <text className="center-play-name" textAnchor="middle">
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

          {/* 角色六边形节点 */}
          <g className="character-hexagons">
            {play.characters.slice(0, characterLayout.length).map((char, index) => {
              const layout = characterLayout[index];
              const pos = axialToCartesian(layout.q, layout.r, charHexSize);

              return (
                <g
                  key={char.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="character-hex-node"
                  onClick={() => handleCharacterClick(char.id)}
                >
                  {/* 六边形背景 */}
                  <polygon
                    points={getHexPoints(charHexSize)}
                    fill="url(#charGradient)"
                    className="char-hex-bg"
                  />

                  {/* 六边形边框 */}
                  <polygon
                    points={getHexPoints(charHexSize)}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2.5"
                    className="char-hex-border"
                  />

                  {/* 角色名称（竖排） */}
                  <text className="character-name" textAnchor="middle">
                    {char.name.split('').map((c, i) => (
                      <tspan
                        key={i}
                        x="0"
                        dy={i === 0 ? `-${(char.name.length - 1) * 0.5}em` : '1em'}
                      >
                        {c}
                      </tspan>
                    ))}
                  </text>

                  {/* 角色标签 */}
                  <g transform={`translate(0, ${charHexSize - 15})`}>
                    <rect
                      x="-20"
                      y="0"
                      width="40"
                      height="14"
                      rx="7"
                      fill="var(--color-primary)"
                      className="char-role-tag"
                    />
                    <text
                      x="0"
                      y="10"
                      className="char-role-text"
                      textAnchor="middle"
                    >
                      {char.role}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* 剧目描述 */}
      <div className="play-description-card">
        <h2>剧目简介</h2>
        <p>{play.description}</p>
      </div>

      {/* 底部说明 */}
      <div className="play-detail-footer">
        <p>点击角色查看详细介绍</p>
      </div>
    </div>
  );
}

export default PlayDetail;

