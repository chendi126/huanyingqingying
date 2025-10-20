# 快速开始指南

## 项目已完成！🎉

这是一个完整的华县皮影介绍网站，具有以下功能：

## ✨ 已实现的功能

### 1. 首页（Home Page）
- ✅ 标题："焕影清音——华县皮影的前世今生"
- ✅ 人物列表卡片展示（4位传承人）
- ✅ 每个卡片包含缩略图和姓名
- ✅ 点击卡片跳转到详情页面
- ✅ 传统文化设计风格

### 2. 详情页（Character Detail Page）
- ✅ 人物姓名标题
- ✅ 高质量展示图片
- ✅ 详细的人物介绍文字
- ✅ 主要成就列表
- ✅ 嵌入式视频播放器
- ✅ 返回首页导航按钮

### 3. 响应式设计
- ✅ 手机端（≤480px）：单列垂直布局
- ✅ 平板端（481-768px）：2-3列自适应布局
- ✅ PC端（≥769px）：多列网格布局
- ✅ 所有设备上都有流畅的用户体验

### 4. 传统文化设计
- ✅ 传统配色方案（棕色、褐色、金色）
- ✅ 中文字体（SimHei、SimSun）
- ✅ 传统装饰元素（✦符号、渐变线条）
- ✅ 精美的卡片和悬停效果
- ✅ 纹理背景和视觉层次

### 5. 技术实现
- ✅ React 19 + Vite 7
- ✅ React Router 7 路由管理
- ✅ CSS3 响应式设计
- ✅ Vitest 单元测试（4个测试全部通过）
- ✅ 热模块替换（HMR）支持

## 🚀 如何运行

### 第一步：进入项目目录
```bash
cd huapi-website
```

### 第二步：启动开发服务器
```bash
npm run dev
```

### 第三步：打开浏览器
访问 `http://localhost:5173/`

## 📋 可用命令

```bash
# 开发模式（带热重载）
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 运行测试
npm test

# 代码检查
npm run lint
```

## 📁 项目文件说明

### 核心文件
- `src/App.jsx` - 主应用组件（包含路由配置）
- `src/pages/Home.jsx` - 首页组件
- `src/pages/CharacterDetail.jsx` - 详情页组件
- `src/data/characters.js` - 人物数据

### 样式文件
- `src/styles/global.css` - 全局传统风格定义
- `src/styles/Home.css` - 首页样式
- `src/styles/CharacterDetail.css` - 详情页样式
- `src/App.css` - 应用全局样式
- `src/index.css` - 基础样式

### 测试文件
- `src/__tests__/App.test.jsx` - 应用测试
- `src/__tests__/setup.js` - 测试配置

## 🎨 自定义指南

### 修改人物数据
编辑 `src/data/characters.js`：
```javascript
{
  id: 1,
  name: "人物姓名",
  title: "职位/身份",
  thumbnail: "缩略图URL",
  image: "详情页图片URL",
  description: "详细介绍",
  videoUrl: "视频嵌入URL",
  achievements: ["成就1", "成就2"]
}
```

### 修改配色方案
编辑 `src/styles/global.css` 中的 CSS 变量：
```css
:root {
  --color-primary: #8b4513;      /* 主色 */
  --color-secondary: #a0522d;    /* 辅助色 */
  --color-accent: #d4a574;       /* 强调色 */
  /* ... 其他颜色 */
}
```

### 修改字体
在 `src/styles/global.css` 中修改字体定义：
```css
--font-serif: 'Noto Serif SC', 'SimSun', serif;
--font-sans: 'SimHei', 'Microsoft YaHei', sans-serif;
```

## 🧪 测试

所有测试都已通过！运行以下命令查看测试结果：
```bash
npm test
```

测试覆盖：
- ✅ 首页标题渲染
- ✅ 副标题显示
- ✅ 人物卡片显示
- ✅ 人物职位显示

## 📱 浏览器兼容性

- Chrome（推荐）
- Firefox
- Safari
- Edge

## 🔧 故障排除

### 端口被占用
如果 5173 端口被占用，Vite 会自动使用下一个可用端口。

### 样式不加载
清除浏览器缓存或按 `Ctrl+Shift+R` 进行硬刷新。

### 路由不工作
确保使用 `npm run dev` 启动开发服务器，而不是直接打开 HTML 文件。

## 📚 下一步

1. **替换图片**：将占位符图片替换为实际的人物照片
2. **添加更多人物**：在 `characters.js` 中添加新的人物数据
3. **部署**：运行 `npm run build` 生成生产版本
4. **扩展功能**：添加搜索、过滤、分享等功能

## 📞 支持

如有问题，请查看项目文档或联系开发团队。

---

**祝您使用愉快！** 🎭✨

