# 视频播放问题修复指南

## 问题描述

部署到服务器后，打开网页会自动下载视频文件，而不是在页面上播放。

## 根本原因

1. **错误的 HTML 标签**：原代码使用 `<iframe>` 标签来显示视频
   - `<iframe>` 用于嵌入外部网页（如 YouTube 嵌入链接）
   - 当 `src` 指向 `.mp4` 文件时，浏览器会将其作为文件下载

2. **缺少正确的 MIME 类型**：服务器没有为 `.mp4` 文件设置正确的 `Content-Type` 和 `Content-Disposition` 响应头

## 解决方案

### 1. 更新 CharacterDetail.jsx

使用 `<video>` 标签替代 `<iframe>` 来播放本地视频文件：

```jsx
{character.videoUrl.startsWith('http') ? (
  // 外部链接使用 iframe
  <iframe
    width="100%"
    height="400"
    src={character.videoUrl}
    title={`${character.name}的视频`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
) : (
  // 本地视频使用 video 标签
  <video
    width="100%"
    height="400"
    controls
    style={{ backgroundColor: '#000' }}
  >
    <source src={character.videoUrl} type="video/mp4" />
    您的浏览器不支持视频播放
  </video>
)}
```

**关键特性**：
- 自动检测：如果 URL 以 `http` 开头，使用 iframe；否则使用 video 标签
- `controls` 属性：显示播放控制条
- `type="video/mp4"`：指定视频格式

### 2. 更新 server.js

配置正确的 MIME 类型和响应头：

```javascript
app.use(express.static(join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  }
}));
```

**关键配置**：
- `Content-Type: video/mp4`：告诉浏览器这是视频文件
- `Content-Disposition: inline`：在浏览器中显示，而不是下载
- `Accept-Ranges: bytes`：支持视频流播放和进度条拖动

## 部署步骤

```bash
# 1. 构建项目
npm run build:server

# 2. 启动服务器
node server.js
```

## 验证

1. **本地测试**：
   ```bash
   npm run build:server
   node server.js
   ```
   访问 `http://localhost:3000/character/5`，应该看到视频播放器

2. **服务器验证**：
   - 访问 `http://your-server:3000/character/5`
   - 应该看到视频播放器，而不是下载对话框
   - 可以使用播放控制条播放、暂停、调整进度

3. **HTTP 响应头检查**：
   ```bash
   curl -I http://your-server:3000/wanghaiyan.mp4
   ```
   应该看到：
   ```
   Content-Type: video/mp4
   Content-Disposition: inline
   Accept-Ranges: bytes
   ```

## 支持的视频格式

当前配置支持 `.mp4` 格式。如需支持其他格式（如 `.webm`、`.ogg`），可以扩展 server.js 的配置。

## 浏览器兼容性

`<video>` 标签在所有现代浏览器中都支持：
- Chrome/Edge 4.0+
- Firefox 3.5+
- Safari 3.1+
- Opera 10.5+
- IE 9+

## 常见问题

**Q: 视频仍然被下载？**
A: 检查服务器是否正确设置了 `Content-Disposition: inline` 响应头。

**Q: 视频无法拖动进度条？**
A: 确保服务器设置了 `Accept-Ranges: bytes` 响应头。

**Q: 视频加载缓慢？**
A: 考虑压缩视频文件或使用 CDN 加速。

