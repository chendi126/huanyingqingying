# 🎯 如何使用后台管理系统

## 📌 核心概念

你现在有了一个**完整的后台管理系统**，可以在浏览器中可视化地添加和编辑内容，**无需编写代码**。

### 工作流程

```
你在浏览器中编辑 → 数据保存到浏览器 → 自动显示在网站上
```

---

## 🚀 三种使用方式

### 方式1️⃣：本地开发（推荐用于测试）

```bash
# 1. 启动开发服务器
npm run dev

# 2. 打开浏览器
http://localhost:5173/admin

# 3. 开始编辑
```

**优点**：快速、实时预览
**缺点**：只在本地有效

---

### 方式2️⃣：部署到服务器（推荐用于生产）

```bash
# 1. 构建项目
npm run build:server

# 2. 部署到服务器
# 上传 dist 文件夹到服务器

# 3. 启动服务器
pm2 start server.js

# 4. 访问管理后台
http://your-server:3000/admin
```

**优点**：可以在任何地方访问
**缺点**：需要部署

---

### 方式3️⃣：使用 GitHub Pages（免费托管）

```bash
# 1. 构建项目
npm run build:github

# 2. 推送到 GitHub
git push origin main

# 3. GitHub Actions 自动部署
# 访问 https://chendi126.github.io/huanyingqingying/admin
```

**优点**：免费、自动部署
**缺点**：需要 GitHub 账户

---

## 📋 管理后台功能详解

### 首页（人物列表）

访问 `/admin` 查看所有人物

**功能**：
- 📊 卡片式展示所有人物
- ➕ 添加新人物
- ✏️ 编辑现有人物
- 🗑️ 删除人物
- 👁️ 预览人物详情
- 📥 导出数据备份
- 📤 导入数据恢复
- 🔄 重置为默认数据

### 添加新人物

点击 **"➕ 添加新人物"** 按钮

**表单字段**：
```
基本信息
├── 姓名 *（必填）
└── 职位/身份 *（必填）

媒体信息
├── 缩略图URL *（必填）
├── 详情页图片URL *（必填）
└── 视频URL（可选）

介绍
└── 详细介绍 *（必填）

主要成就
└── 成就列表（可选）
```

**示例**：
```
姓名：汪海燕
职位：陕西省工艺美术大师
缩略图：/wanghaiyan.png
详情图：/wanghaiyan.png
视频：/wanghaiyan.mp4
介绍：汪海燕，第三届陕西省一级工艺美术大师...
成就：
  - 第三届陕西省一级工艺美术大师
  - 2018年度'西安工匠'
  - 国家级非物质文化遗产项目'华县皮影戏'区级传承人
```

### 编辑人物

点击人物卡片上的 **"编辑"** 按钮

修改任何信息后点击 **"保存"**

### 删除人物

点击人物卡片上的 **"删除"** 按钮，确认删除

### 导出数据

点击 **"📥 导出数据"** 按钮

自动下载 JSON 文件，用于备份

### 导入数据

点击 **"📤 导入数据"** 按钮

粘贴之前导出的 JSON 数据，点击 **"导入"**

---

## 💾 数据存储说明

### 存储位置

数据存储在**浏览器的 localStorage** 中

### 查看存储的数据

在浏览器开发者工具中：
1. 按 `F12` 打开开发者工具
2. 进入 **Application** 标签
3. 左侧选择 **Local Storage**
4. 找到你的网站
5. 查看 `characters` 键的值

### 数据格式

```javascript
[
  {
    id: 1,
    name: "汪海燕",
    title: "陕西省工艺美术大师",
    thumbnail: "/wanghaiyan.png",
    image: "/wanghaiyan.png",
    description: "...",
    videoUrl: "/wanghaiyan.mp4",
    achievements: ["成就1", "成就2"]
  },
  // 更多人物...
]
```

---

## 🖼️ 图片管理

### 上传图片到本地

1. 将图片文件放在 `public` 目录
2. 在表单中使用 `/image-name.png` 作为URL

### 使用网络图片

直接输入完整的 URL：
```
https://example.com/image.png
```

### 使用占位符

快速测试时可以使用占位符：
```
https://via.placeholder.com/300x300?text=人物名字
```

---

## 🎬 视频管理

### 本地视频

1. 将视频文件放在 `public` 目录
2. 在表单中使用 `/video-name.mp4`

### 外部视频

支持 YouTube 等外部链接：
```
https://www.youtube.com/embed/dQw4w9WgXcQ
```

---

## 📱 在不同设备上使用

### 电脑
```
http://localhost:5173/admin
```

### 手机/平板
```
http://your-server-ip:3000/admin
```

### 远程访问
```
http://your-domain.com/admin
```

---

## 🔒 安全建议

### 本地使用
- ✅ 安全，无需担心

### 服务器使用
- ⚠️ 建议添加密码保护
- ⚠️ 定期备份数据
- ⚠️ 使用 HTTPS

### 添加简单密码保护

编辑 `src/pages/Admin/AdminDashboard.jsx`，在顶部添加：

```jsx
const [password, setPassword] = useState('');
const [authenticated, setAuthenticated] = useState(false);

if (!authenticated) {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>管理后台</h2>
      <input 
        type="password" 
        placeholder="输入密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => {
        if (password === 'your-password-here') {
          setAuthenticated(true);
        } else {
          alert('密码错误');
        }
      }}>
        进入
      </button>
    </div>
  );
}
```

---

## 🆘 常见问题

**Q: 编辑后的数据在哪里？**
A: 保存在浏览器的 localStorage 中。关闭浏览器后数据仍然保存。

**Q: 如何在另一台电脑上访问编辑的数据？**
A: 
1. 在原电脑上导出数据（📥 导出数据）
2. 在新电脑上导入数据（📤 导入数据）

**Q: 如何备份数据？**
A: 定期点击 **"📥 导出数据"** 按钮，保存 JSON 文件。

**Q: 清除浏览器缓存后数据会丢失吗？**
A: 是的。建议定期导出备份。

**Q: 如何恢复已删除的人物？**
A: 如果有备份，可以导入之前导出的 JSON 文件。

---

## 📊 工作流程示例

### 场景：添加一个新的皮影传承人

1. **进入管理后台**
   ```
   http://localhost:5173/admin
   ```

2. **点击"➕ 添加新人物"**

3. **填写表单**
   - 姓名：李明
   - 职位：皮影表演艺术家
   - 缩略图：https://via.placeholder.com/300x300?text=李明
   - 详情图：https://via.placeholder.com/800x600?text=李明
   - 介绍：李明是...
   - 视频：https://www.youtube.com/embed/...
   - 成就：
     - 国家级非遗传承人
     - 获得多项奖项

4. **点击"保存"**

5. **返回首页查看**
   - 新人物已出现在首页列表中

6. **点击"预览"查看详情页**

7. **定期导出备份**
   - 点击"📥 导出数据"保存 JSON 文件

---

## 🎉 完成！

现在你可以完全通过浏览器管理所有内容了！

**下一步**：
- 📖 阅读 `ADMIN_QUICK_START.md` 了解更多细节
- 🔧 阅读 `ADMIN_SYSTEM_GUIDE.md` 了解高级功能
- 🚀 部署到服务器让其他人也能访问

有任何问题，请查看相关文档或检查浏览器控制台。

