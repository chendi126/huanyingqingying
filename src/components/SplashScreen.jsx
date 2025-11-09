import { useState, useEffect } from 'react';
import '../styles/SplashScreen.css';

const SplashScreen = ({ duration = 7000, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [clickPosition, setClickPosition] = useState(null);
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [showSecondLine, setShowSecondLine] = useState(false);

  const firstLine = '焕影清音';
  const secondLine = '- 传承华县皮影艺术';
  const typingSpeed = 200; // 每个字符的打字速度（毫秒）

  // 打字机效果 - 第一行
  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= firstLine.length) {
        setDisplayedText1(firstLine.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // 第一行打完后，延迟显示第二行
        setTimeout(() => setShowSecondLine(true), 300);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [isVisible]);

  // 打字机效果 - 第二行
  useEffect(() => {
    if (!isVisible || !showSecondLine) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= secondLine.length) {
        setDisplayedText2(secondLine.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [showSecondLine, isVisible]);

  // 自动消失定时器
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      handleExit();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, isVisible]);

  // 处理退出动画
  const handleExit = (e = null) => {
    if (isExiting) return;

    // 如果是点击事件，记录点击位置
    if (e) {
      setClickPosition({
        x: e.clientX,
        y: e.clientY
      });
    }

    setIsExiting(true);

    // 等待退出动画完成后移除组件
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, 1000); // 退出动画时长
  };

  // 处理点击事件
  const handleClick = (e) => {
    handleExit(e);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`splash-screen ${isExiting ? 'exiting' : ''}`}
      onClick={handleClick}
      style={
        clickPosition
          ? {
              '--click-x': `${clickPosition.x}px`,
              '--click-y': `${clickPosition.y}px`,
            }
          : {}
      }
    >
      <div className="splash-content">
        <div className="splash-text-container">
          <h1 className="splash-title">
            <span className="splash-title-main">{displayedText1}</span>
            {displayedText1.length === firstLine.length && !showSecondLine && (
              <span className="cursor">|</span>
            )}
          </h1>
          {showSecondLine && (
            <p className="splash-subtitle">
              {displayedText2}
              {displayedText2.length < secondLine.length && (
                <span className="cursor">|</span>
              )}
            </p>
          )}
          <p className="splash-hint">点击屏幕任意位置跳过</p>
        </div>
      </div>

      {/* 装饰元素 */}
      <div className="splash-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
};

export default SplashScreen;

