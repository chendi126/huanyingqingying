import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 配置 MIME 类型和缓存策略
app.use(express.static(join(__dirname, 'public'), {
  maxAge: '1y', // 静态资源缓存1年
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('Accept-Ranges', 'bytes');
    } else if (path.endsWith('.ttf') || path.endsWith('.otf') || path.endsWith('.woff') || path.endsWith('.woff2')) {
      // 字体文件配置
      res.setHeader('Content-Type', 'font/ttf');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Access-Control-Allow-Origin', '*');
    } else if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.gif') || path.endsWith('.svg')) {
      // 图片文件缓存
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (path.endsWith('.css') || path.endsWith('.js')) {
      // CSS 和 JS 文件缓存
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// 提供 dist 目录中的静态文件
app.use(express.static(join(__dirname, 'dist'), {
  maxAge: '1y',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      // HTML 文件不缓存，确保总是获取最新版本
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// 处理 SPA 路由 - 所有请求都返回 index.html
// Express 5.x 不支持 '*'，使用正则表达式匹配所有路径
app.get(/.*/, (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎭 皮影戏网站服务器已启动`);
  console.log(`📍 本地访问: http://localhost:${PORT}`);
  console.log(`🌐 服务器访问: http://0.0.0.0:${PORT}`);
  console.log(`✨ 静态资源已启用缓存优化`);
});

