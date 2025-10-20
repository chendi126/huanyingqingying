# 部署到 Linux 服务器 - 快速指南

## 🎯 目标
在服务器上通过 `http://1.95.41.96:3000` 访问网站

---

## 📋 前置要求

你的服务器需要安装：
- Node.js (v18+)
- npm
- PM2 (进程管理)
- Git

---

## 🚀 部署步骤

### 第一步：连接到服务器

```bash
ssh root@1.95.41.96
```

### 第二步：安装必要的工具

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 和 npm（如果还没有）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PM2（全局）
sudo npm install -g pm2
```

### 第三步：克隆项目

```bash
cd /home
git clone https://github.com/chendi126/huaxianpiying.git
cd huaxianpiying/huapi-website
```

### 第四步：安装依赖并构建

```bash
npm install
npm run build
```

### 第五步：启动应用

```bash
# 使用 PM2 启动
pm2 start ecosystem.config.js

# 保存 PM2 配置（开机自启）
pm2 save
pm2 startup
```

### 第六步：开放防火墙端口

```bash
# 开放 3000 端口
sudo ufw allow 3000/tcp

# 启用防火墙（如果还没启用）
sudo ufw enable
```

---

## ✅ 验证部署

### 检查应用状态

```bash
pm2 status
```

应该看到 `huaxianpiying` 应用处于 `online` 状态

### 查看日志

```bash
pm2 logs huaxianpiying
```

### 在服务器上测试

```bash
curl http://localhost:3000
```

### 在本地浏览器访问

打开浏览器访问：
```
http://1.95.41.96:3000
```

---

## 🔄 常用命令

### 查看应用状态
```bash
pm2 status
```

### 查看日志
```bash
pm2 logs huaxianpiying
```

### 重启应用
```bash
pm2 restart huaxianpiying
```

### 停止应用
```bash
pm2 stop huaxianpiying
```

### 删除应用
```bash
pm2 delete huaxianpiying
```

---

## 🔄 更新应用

每次你推送新代码到 GitHub 时，在服务器上运行：

```bash
cd /home/huaxianpiying/huapi-website
git pull origin main
npm run build
pm2 restart huaxianpiying
```

---

## 🆘 故障排查

### 应用无法启动

**检查日志**：
```bash
pm2 logs huaxianpiying
```

**常见原因**：
- 端口被占用：`sudo lsof -i :3000`
- 依赖未安装：`npm install`
- 构建失败：`npm run build`

### 无法访问网站

**检查防火墙**：
```bash
sudo ufw status
```

**检查端口是否开放**：
```bash
sudo netstat -tlnp | grep 3000
```

### 应用崩溃

**查看详细日志**：
```bash
pm2 logs huaxianpiying --lines 100
```

**重启应用**：
```bash
pm2 restart huaxianpiying
```

---

## 📊 部署架构

```
你的电脑
    ↓
GitHub 仓库
    ↓
服务器 (1.95.41.96)
    ├── Node.js
    ├── Express 服务器 (端口 3000)
    └── PM2 (进程管理)
    ↓
浏览器访问：http://1.95.41.96:3000
```

---

## 🎯 访问网站

```
http://1.95.41.96:3000
```

---

## 📞 需要帮助？

如果部署过程中遇到问题，请：

1. 查看 PM2 日志：`pm2 logs huaxianpiying`
2. 检查防火墙设置：`sudo ufw status`
3. 检查端口是否开放：`sudo netstat -tlnp | grep 3000`
4. 检查 Node.js 版本：`node --version`

