# 媒体文件部署问题修复指南

## 问题描述

部署到服务器后，图片和视频无法显示。

## 根本原因

在 `src/data/characters.js` 中，汪海燕（第 5 个人物）的媒体文件使用相对路径：
- `thumbnail: "/汪海燕.png"`
- `image: "/汪海燕.png"`
- `videoUrl: "/汪海燕.mp4"`

这些文件存储在 `public/` 目录中，但 `server.js` 没有正确配置来提供这些静态文件。

## 解决方案

### 1. 更新 server.js

已修改 `server.js` 以正确提供 `public` 目录中的静态文件：

```javascript
// 提供 public 目录中的静态文件（优先级最高）
app.use(express.static(join(__dirname, 'public')));

// 提供 dist 目录中的静态文件
app.use(express.static(join(__dirname, 'dist')));
```

**关键点**：
- `public` 目录的中间件必须在 `dist` 目录之前，以确保优先级
- 这样可以确保 `/汪海燕.png` 和 `/汪海燕.mp4` 等请求被正确路由到 `public` 目录

### 2. 构建和部署步骤

```bash
# 1. 安装依赖
npm install

# 2. 构建项目
npm run build:server

# 3. 启动服务器
node server.js
```

### 3. 验证部署

部署后，访问以下 URL 验证媒体文件是否正确加载：
- `http://your-server:3000/汪海燕.png` - 应该显示图片
- `http://your-server:3000/汪海燕.mp4` - 应该下载视频文件

## 文件结构

```
./
├── public/
│   ├── 汪海燕.png          ← 汪海燕的图片
│   ├── 汪海燕.mp4          ← 汪海燕的视频
│   ├── jieyuan.jpg
│   └── vite.svg
├── dist/                    ← 构建输出
│   ├── index.html
│   ├── assets/
│   └── ...
├── src/
│   ├── data/
│   │   └── characters.js    ← 包含媒体路径的数据文件
│   └── ...
├── server.js               ← 已修改
└── package.json
```

## 注意事项

1. **确保 public 目录被复制到服务器**：部署时需要确保 `public` 目录及其所有文件都被复制到服务器上。

2. **Nginx 配置**：如果使用 Nginx 反向代理，确保 Nginx 配置正确转发所有请求到 Node.js 应用。

3. **缓存问题**：如果更新了媒体文件，可能需要清除浏览器缓存或使用 `Ctrl+Shift+Delete` 进行硬刷新。

## 测试

在本地测试：
```bash
npm run build:server
node server.js
```

然后访问 `http://localhost:3000`，检查汪海燕的页面是否正确显示图片和视频。

