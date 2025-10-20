# GitHub Pages 部署指南

## 🔧 配置步骤

### 1. 在 GitHub 仓库设置中启用 Pages

1. 打开你的仓库：https://github.com/chendi126/huaxianpiying
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分：
   - 选择 **Deploy from a branch**
   - 选择分支：**gh-pages**
   - 选择文件夹：**/ (root)**
5. 点击 **Save**

### 2. 等待部署完成

- GitHub Actions 会自动运行
- 可以在 **Actions** 标签页查看部署进度
- 部署通常需要 1-2 分钟

### 3. 访问你的网站

部署完成后，访问：
```
https://chendi126.github.io/huaxianpiying/
```

---

## 📊 部署流程

```
你推送代码到 main 分支
        ↓
GitHub Actions 自动触发
        ↓
在 huapi-website 目录中运行 npm install
        ↓
在 huapi-website 目录中运行 npm run build
        ↓
创建 .nojekyll 文件
        ↓
部署 dist 文件夹到 gh-pages 分支
        ↓
GitHub Pages 自动发布
        ↓
网站在 https://chendi126.github.io/huaxianpiying/ 上线
```

---

## 🔄 后续更新

每次你推送代码到 `main` 分支时：

1. GitHub Actions 会自动构建
2. 自动部署到 GitHub Pages
3. 网站自动更新

**无需手动操作！**

---

## 🆘 故障排查

### 404 错误

**原因**：GitHub Pages 还没有正确配置

**解决方案**：
1. 确保在 Settings > Pages 中选择了 `gh-pages` 分支
2. 等待 GitHub Actions 完成部署
3. 清除浏览器缓存（Ctrl+Shift+Delete）
4. 重新访问网站

### 样式或资源加载失败

**原因**：路径配置不正确

**解决方案**：
- 检查 `vite.config.js` 中的 `base` 配置
- 确保 `base: '/huaxianpiying/'` 正确

### GitHub Actions 部署失败

**查看日志**：
1. 打开仓库的 **Actions** 标签
2. 点击最新的工作流运行
3. 查看错误信息

---

## 📁 项目结构

```
huaxianpiying/
├── huapi-website/
│   ├── src/
│   ├── dist/              # 构建输出目录
│   ├── vite.config.js     # Vite 配置（包含 base 路径）
│   ├── package.json
│   └── .github/
│       └── workflows/
│           └── deploy.yml # GitHub Actions 工作流
└── ...
```

---

## ✅ 验证部署

### 检查 GitHub Pages 是否启用

访问：https://github.com/chendi126/huaxianpiying/settings/pages

应该看到：
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: / (root)
- 状态：Your site is live at https://chendi126.github.io/huaxianpiying/

### 检查 GitHub Actions 工作流

访问：https://github.com/chendi126/huaxianpiying/actions

应该看到最新的工作流运行状态为 ✅ 成功

---

## 🌐 访问网站

```
https://chendi126.github.io/huaxianpiying/
```

---

## 📞 需要帮助？

如果部署过程中遇到问题，请：

1. 检查 GitHub Actions 日志
2. 确保 GitHub Pages 设置正确
3. 清除浏览器缓存
4. 等待 5-10 分钟后重试

