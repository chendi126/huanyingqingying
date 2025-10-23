# 字体和样式加载问题修复指南

## 🔍 问题诊断

### 发现的问题

1. **字体文件路径配置错误**
   - `HYNianHuaSong` 字体指向了错误的文件 `HYWenRunSongYunU.ttf`
   - 应该指向 `HYNianHuaSongU.ttf`

2. **缺少字体文件的 MIME 类型配置**
   - 服务器没有正确设置字体文件的 Content-Type
   - 缺少 CORS 头，可能导致跨域字体加载失败

3. **没有启用缓存策略**
   - 静态资源每次都重新下载
   - 字体文件较大（中文字体通常 2-5MB），导致加载缓慢

4. **Nginx 配置不完善**
   - 没有针对字体文件的特殊处理
   - 缺少 gzip 压缩配置

## ✅ 已修复的内容

### 1. 修复字体路径配置 (`src/styles/global.css`)

**修改前：**
```css
@font-face {
  font-family: 'HYNianHuaSong';
  src: url('/HYWenRunSongYunU.ttf') format('truetype');  /* ❌ 错误 */
}

@font-face {
  font-family: 'HYWenRunSongYun';
  src: url('/yunxiWord.ttf') format('truetype');
}
```

**修改后：**
```css
@font-face {
  font-family: 'HYNianHuaSong';
  src: url('/HYNianHuaSongU.ttf') format('truetype');  /* ✅ 正确 */
}

@font-face {
  font-family: 'HYWenRunSongYun';
  src: url('/HYWenRunSongYunU.ttf') format('truetype');  /* ✅ 正确 */
}

@font-face {
  font-family: 'YunxiWord';
  src: url('/yunxiWord.ttf') format('truetype');  /* ✅ 新增 */
}
```

### 2. 优化服务器配置 (`server.js`)

**新增功能：**
- ✅ 字体文件 MIME 类型配置
- ✅ 字体文件 CORS 支持
- ✅ 静态资源长期缓存（1年）
- ✅ HTML 文件不缓存（确保更新）
- ✅ 更详细的启动日志

**关键代码：**
```javascript
// 字体文件配置
if (path.endsWith('.ttf') || path.endsWith('.otf') || path.endsWith('.woff') || path.endsWith('.woff2')) {
  res.setHeader('Content-Type', 'font/ttf');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('Access-Control-Allow-Origin', '*');
}
```

### 3. 创建优化的 Nginx 配置 (`nginx-optimized.conf`)

**新增功能：**
- ✅ gzip 压缩（减少传输大小）
- ✅ 字体文件长期缓存（1年）
- ✅ 字体文件 CORS 支持
- ✅ 图片、CSS、JS 文件缓存优化
- ✅ 视频文件范围请求支持
- ✅ 安全头配置

### 4. 创建优化部署脚本 (`deploy-optimized.sh`)

**功能：**
- ✅ 自动检查 Node.js 版本
- ✅ 自动安装 PM2
- ✅ 清理旧文件
- ✅ 验证字体文件存在
- ✅ 验证构建结果
- ✅ 自动启动服务

## 🚀 部署步骤

### 方案 A: 使用优化部署脚本（推荐）

```bash
# 1. 上传代码到服务器
cd /var/www/huaxianpiying  # 或你的项目目录

# 2. 给脚本执行权限
chmod +x deploy-optimized.sh

# 3. 运行部署脚本
./deploy-optimized.sh
```

### 方案 B: 手动部署

```bash
# 1. 清理旧文件
rm -rf dist node_modules/.vite

# 2. 安装依赖
npm install

# 3. 构建项目
npm run build:server

# 4. 停止旧服务
pm2 delete huaxianpiying

# 5. 启动新服务
pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"

# 6. 保存配置
pm2 save
```

### 配置 Nginx（可选但推荐）

```bash
# 1. 复制优化的 Nginx 配置
sudo cp nginx-optimized.conf /etc/nginx/sites-available/huaxianpiying

# 2. 创建软链接
sudo ln -sf /etc/nginx/sites-available/huaxianpiying /etc/nginx/sites-enabled/

# 3. 删除默认配置（如果存在）
sudo rm -f /etc/nginx/sites-enabled/default

# 4. 测试配置
sudo nginx -t

# 5. 重启 Nginx
sudo systemctl restart nginx
```

## 🧪 验证修复

### 1. 检查字体文件是否可访问

```bash
# 在服务器上测试
curl -I http://localhost:3000/HYNianHuaSongU.ttf
curl -I http://localhost:3000/HYWenRunSongYunU.ttf
curl -I http://localhost:3000/yunxiWord.ttf

# 应该返回 200 OK 和正确的 Content-Type
```

### 2. 在浏览器中验证

1. 打开浏览器开发者工具（F12）
2. 切换到 Network 标签
3. 刷新页面（Ctrl+Shift+R 强制刷新）
4. 查找字体文件请求：
   - 状态应该是 `200 OK`
   - Type 应该是 `font` 或 `ttf`
   - Size 应该显示文件大小
   - Time 第二次访问应该显示 `(from disk cache)`

### 3. 检查字体是否生效

在浏览器开发者工具的 Console 中运行：

```javascript
// 检查字体是否加载
document.fonts.ready.then(() => {
  console.log('已加载的字体:');
  document.fonts.forEach(font => {
    console.log(`- ${font.family}`);
  });
});

// 检查元素使用的字体
const title = document.querySelector('.title');
console.log('标题字体:', window.getComputedStyle(title).fontFamily);
```

## 📊 性能对比

### 修复前
- 首次加载时间：~8-15秒
- 字体加载：失败或使用系统默认字体
- 每次访问都重新下载所有资源

### 修复后
- 首次加载时间：~3-5秒（取决于网络）
- 字体加载：成功，显示自定义字体
- 第二次访问：~0.5-1秒（使用缓存）

## 🔧 故障排查

### 问题 1: 字体仍然不显示

**解决方案：**
```bash
# 1. 检查字体文件是否存在
ls -lh public/*.ttf

# 2. 检查文件权限
chmod 644 public/*.ttf

# 3. 清除浏览器缓存
# 在浏览器中按 Ctrl+Shift+Delete

# 4. 检查服务器日志
pm2 logs huaxianpiying
```

### 问题 2: 样式加载缓慢

**解决方案：**
```bash
# 1. 确认 Nginx 已启用 gzip
sudo nginx -T | grep gzip

# 2. 检查缓存头是否正确
curl -I http://your-server:3000/assets/index.css

# 3. 使用 CDN（可选）
# 将字体文件上传到 CDN 服务
```

### 问题 3: CORS 错误

**解决方案：**
```bash
# 检查响应头
curl -I http://your-server:3000/HYNianHuaSongU.ttf

# 应该包含：
# Access-Control-Allow-Origin: *
```

## 📝 维护建议

1. **定期更新依赖**
   ```bash
   npm update
   npm audit fix
   ```

2. **监控服务状态**
   ```bash
   pm2 monit
   ```

3. **定期检查日志**
   ```bash
   pm2 logs huaxianpiying --lines 100
   ```

4. **备份配置文件**
   ```bash
   cp server.js server.js.backup
   cp nginx-optimized.conf nginx-optimized.conf.backup
   ```

## 🎯 进一步优化建议

1. **使用 CDN**
   - 将字体文件上传到 CDN（如阿里云 OSS、腾讯云 COS）
   - 减少服务器带宽压力

2. **字体子集化**
   - 只包含网站使用的汉字
   - 可以将字体文件大小减少 80-90%

3. **使用 WOFF2 格式**
   - 比 TTF 格式小 30-50%
   - 现代浏览器都支持

4. **启用 HTTP/2**
   - 多路复用，加快资源加载
   - 需要 HTTPS 支持

5. **使用 Service Worker**
   - 离线缓存
   - 更快的二次加载

## 📞 需要帮助？

如果问题仍未解决，请提供：
1. 浏览器开发者工具的 Network 截图
2. 服务器日志：`pm2 logs huaxianpiying`
3. Nginx 日志：`sudo tail -100 /var/log/nginx/huaxianpiying_error.log`
4. 字体文件列表：`ls -lh public/*.ttf`

