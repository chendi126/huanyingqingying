import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 立即滚动到页面顶部
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 使用 instant 而不是 smooth，确保立即滚动
    });

    // 备用方案：使用 setTimeout 确保在 DOM 更新后滚动
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      // 同时尝试滚动 document.documentElement 和 document.body
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

