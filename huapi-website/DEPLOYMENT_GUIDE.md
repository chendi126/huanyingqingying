# 皮影戏网站 - Linux 服务器部署指南

## 📋 部署前准备

### 需要开放的端口
- **80** (HTTP) - 网页访问
- **443** (HTTPS) - 如果使用 SSL 证书

### 服务器要求
- Linux (Ubuntu/CentOS)
- Node.js 16+
- Nginx
- PM2 (进程管理)

---

## 🚀 部署步骤

### 1. 连接到服务器
```bash
ssh root@1.95.41.96
```

### 2. 安装依赖
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Nginx
sudo apt install nginx -y

# 安装 PM2 全局
sudo npm install -g pm2
```

### 3. 克隆项目
```bash
cd /home
git clone https://github.com/chendi126/huaxianpiying.git
cd huaxianpiying/huapi-website
```

### 4. 安装项目依赖
```bash
npm install
```

### 5. 构建项目
```bash
npm run build
```

### 6. 启动应用（使用 PM2）
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 7. 配置 Nginx
```bash
# 复制 Nginx 配置
sudo cp nginx.conf /etc/nginx/sites-available/huaxianpiying

# 创建软链接
sudo ln -s /etc/nginx/sites-available/huaxianpiying /etc/nginx/sites-enabled/

# 删除默认配置
sudo rm /etc/nginx/sites-enabled/default

# 测试 Nginx 配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 8. 启用防火墙（如果需要）
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## ✅ 验证部署

### 检查应用是否运行
```bash
pm2 status
pm2 logs huaxianpiying
```

### 检查 Nginx 是否运行
```bash
sudo systemctl status nginx
```

### 访问网站
在浏览器中访问：`http://1.95.41.96`

---

## 🔄 更新部署

当你推送新代码到 GitHub 时：

```bash
cd /home/huaxianpiying/huapi-website

# 拉取最新代码
git pull origin main

# 重新构建
npm run build

# 重启应用
pm2 restart huaxianpiying
```

---

## 📊 常用命令

```bash
# 查看应用状态
pm2 status

# 查看应用日志
pm2 logs huaxianpiying

# 重启应用
pm2 restart huaxianpiying

# 停止应用
pm2 stop huaxianpiying

# 启动应用
pm2 start ecosystem.config.js

# 查看 Nginx 状态
sudo systemctl status nginx

# 重启 Nginx
sudo systemctl restart nginx

# 查看 Nginx 日志
sudo tail -f /var/log/nginx/huaxianpiying_access.log
```

---

## 🔒 HTTPS 配置（可选）

如果需要 HTTPS，使用 Let's Encrypt：

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取证书
sudo certbot --nginx -d 1.95.41.96

# 自动续期
sudo systemctl enable certbot.timer
```

---

## 🆘 故障排查

### 应用无法启动
```bash
pm2 logs huaxianpiying
# 查看错误日志
```

### Nginx 无法连接到应用
```bash
# 检查应用是否运行在 3000 端口
netstat -tlnp | grep 3000

# 检查 Nginx 配置
sudo nginx -t
```

### 端口被占用
```bash
# 查看占用 3000 端口的进程
lsof -i :3000

# 查看占用 80 端口的进程
lsof -i :80
```

---

## 📞 需要帮助？

如果部署过程中遇到问题，请提供：
1. 错误信息
2. 服务器日志（`pm2 logs` 或 `sudo tail -f /var/log/nginx/error.log`）
3. 你执行的命令

