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

  // 正方形布局配置
  const centerSquareSize = 100; // 中心正方形（剧目）
  const charSquareSize = 70;    // 角色正方形

  // 为角色分配正方形位置（分散排列）
  const getCharacterLayout = () => {
    const charCount = play.characters.length;
    const layouts = {
      1: [{ x: 140, y: 0 }],
      2: [{ x: 140, y: 0 }, { x: -140, y: 0 }],
      3: [{ x: 140, y: 0 }, { x: -140, y: 0 }, { x: 0, y: -120 }],
      4: [{ x: 140, y: 0 }, { x: -140, y: 0 }, { x: 0, y: -120 }, { x: 0, y: 120 }],
      5: [{ x: 140, y: -60 }, { x: 140, y: 60 }, { x: -140, y: -60 }, { x: -140, y: 60 }, { x: 0, y: -120 }],
      6: [{ x: 140, y: -60 }, { x: 140, y: 60 }, { x: -140, y: -60 }, { x: -140, y: 60 }, { x: 0, y: -120 }, { x: 0, y: 120 }],
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
        <svg className="character-network-svg" viewBox="-250 -180 500 360" preserveAspectRatio="xMidYMid meet">
          {/* 定义渐变 */}
          <defs>
            {/* 红色渐变 - 用于左上角直角边框装饰 */}
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4145a" />
              <stop offset="50%" stopColor="#e85d9f" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>

            {/* 深红色渐变 - 用于右下角直角边框装饰 */}
            <linearGradient id="darkRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b0000" />
              <stop offset="50%" stopColor="#a52a2a" />
              <stop offset="100%" stopColor="#b22222" />
            </linearGradient>

            {/* 发光滤镜 */}
            <filter id="charGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 绘制连接线 - 从中心到各个角色 */}
          <g className="connection-lines">
            {play.characters.slice(0, characterLayout.length).map((char, index) => {
              const layout = characterLayout[index];
              return (
                <line
                  key={`line-${char.id}`}
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

          {/* 中心剧目正方形 */}
          <g className="center-play-square" style={{ pointerEvents: 'none' }}>
            {/* 正方形背景 - 透明模糊 */}
            <rect
              x={-centerSquareSize / 2}
              y={-centerSquareSize / 2}
              width={centerSquareSize}
              height={centerSquareSize}
              fill="rgba(255, 255, 255, 0.2)"
              className="center-square-bg"
            />

            {/* 左上角直角边框装饰 - 深红色渐变 */}
            <polyline
              points={`${-centerSquareSize / 2},${-centerSquareSize / 2 + centerSquareSize * 0.25} ${-centerSquareSize / 2},${-centerSquareSize / 2} ${-centerSquareSize / 2 + centerSquareSize * 0.25},${-centerSquareSize / 2}`}
              fill="none"
              stroke="url(#darkRedGradient)"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="center-corner-border top-left"
            />

            {/* 右下角直角边框装饰 - 深红色渐变 */}
            <polyline
              points={`${centerSquareSize / 2},${centerSquareSize / 2 - centerSquareSize * 0.25} ${centerSquareSize / 2},${centerSquareSize / 2} ${centerSquareSize / 2 - centerSquareSize * 0.25},${centerSquareSize / 2}`}
              fill="none"
              stroke="url(#darkRedGradient)"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="center-corner-border bottom-right"
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

          {/* 角色正方形节点 */}
          <g className="character-squares">
            {play.characters.slice(0, characterLayout.length).map((char, index) => {
              const layout = characterLayout[index];
              const halfSize = charSquareSize / 2;
              const cornerLength = charSquareSize * 0.25;

              return (
                <g
                  key={char.id}
                  transform={`translate(${layout.x}, ${layout.y})`}
                  className="character-square-node"
                  onClick={() => handleCharacterClick(char.id)}
                >
                  {/* 正方形背景 - 透明模糊 */}
                  <rect
                    x={-halfSize}
                    y={-halfSize}
                    width={charSquareSize}
                    height={charSquareSize}
                    fill="rgba(255, 255, 255, 0.2)"
                    className="char-square-bg"
                  />

                  {/* 左上角直角边框装饰 - 深红色渐变 */}
                  <polyline
                    points={`${-halfSize},${-halfSize + cornerLength} ${-halfSize},${-halfSize} ${-halfSize + cornerLength},${-halfSize}`}
                    fill="none"
                    stroke="url(#darkRedGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    className="char-corner-border top-left"
                  />

                  {/* 右下角直角边框装饰 - 深红色渐变 */}
                  <polyline
                    points={`${halfSize},${halfSize - cornerLength} ${halfSize},${halfSize} ${halfSize - cornerLength},${halfSize}`}
                    fill="none"
                    stroke="url(#darkRedGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    className="char-corner-border bottom-right"
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
                  <g transform={`translate(0, ${halfSize - 10})`}>
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

