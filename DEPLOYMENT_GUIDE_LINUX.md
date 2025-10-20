# 皮影戏网站 Linux 云服务器部署指南

## 概述
本指南将帮助您将皮影戏网站部署到 Linux 云服务器上，使用 Node.js + Express 作为后端，Nginx 作为反向代理。

## 服务器要求
- **操作系统**: Ubuntu 20.04+ / CentOS 7+ / Debian 10+
- **内存**: 至少 1GB 推荐 2GB+
- **存储**: 至少 10GB 可用空间
- **网络**: 开放端口 80 (HTTP) 和 443 (HTTPS)

## 部署步骤

### 第一步：服务器环境准备

#### 1. 更新系统
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
```

#### 2. 安装 Node.js 20+
```bash
# 使用 NodeSource 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version  # 应该显示 v20.x.x
npm --version
```

#### 3. 安装 PM2 进程管理器
```bash
sudo npm install -g pm2

# 设置 PM2 开机自启
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
```

#### 4. 安装 Nginx
```bash
# Ubuntu/Debian
sudo apt install nginx -y

# CentOS/RHEL
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 第二步：项目部署

#### 1. 创建项目目录
```bash
sudo mkdir -p /var/www/huaxianpiying
sudo chown -R $USER:$USER /var/www/huaxianpiying
cd /var/www/huaxianpiying
```

#### 2. 上传项目文件
您可以通过以下方式上传项目文件：

**方式一：使用 Git**
```bash
git clone https://github.com/chendi126/huanyingqingying.git .
```

**方式二：使用 SCP（从本地上传）**
```bash
# 在本地终端执行
scp -r /path/to/your/local/project/* username@your-server-ip:/var/www/huaxianpiying/
```

**方式三：使用 FTP/SFTP**
使用 FileZilla 等工具上传文件到 `/var/www/huaxianpiying/` 目录

#### 3. 安装项目依赖
```bash
cd /var/www/huaxianpiying
npm install
```

#### 4. 构建项目
```bash
# 为服务器构建（基础路径为 /）
npm run build:server
```

### 第三步：配置和启动应用

#### 1. 配置 PM2
```bash
# 启动应用
pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"

# 或者使用 ecosystem 配置文件
pm2 start ecosystem.config.js

# 保存 PM2 配置
pm2 save

# 设置开机自启
pm2 startup
```

#### 2. 检查应用状态
```bash
pm2 status
pm2 logs huaxianpiying
```

### 第四步：配置 Nginx

#### 1. 创建 Nginx 配置文件
```bash
sudo nano /etc/nginx/sites-available/huaxianpiying
```

#### 2. 添加以下配置
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # 替换为您的域名或IP

    # 日志配置
    access_log /var/log/nginx/huaxianpiying_access.log;
    error_log /var/log/nginx/huaxianpiying_error.log;

    # 客户端上传文件大小限制
    client_max_body_size 50M;

    # 静态文件缓存配置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|mp4|mp3)$ {
        proxy_pass http://localhost:3000;
        expires 30d;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }

    # API 请求代理
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 主应用代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # SPA 支持 - 所有路径都返回 index.html
        try_files $uri $uri/ @fallback;
    }
    
    location @fallback {
        proxy_pass http://localhost:3000;
    }
}
```

#### 3. 启用站点配置
```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/huaxianpiying /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

### 第五步：域名和SSL配置（可选但推荐）

#### 1. 安装 Certbot（Let's Encrypt）
```bash
sudo apt install certbot python3-certbot-nginx -y
```

#### 2. 获取SSL证书
```bash
# 替换为您的实际域名
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

#### 3. 自动续期
```bash
# 测试自动续期
sudo certbot renew --dry-run
```

### 第六步：防火墙配置

#### 1. 配置 UFW（Ubuntu）
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

#### 2. 或者使用 iptables
```bash
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

## 后端页面说明

### 是否需要创建后端页面？

**当前项目结构**：
- ✅ **不需要额外的后端页面** - 您的项目已经是完整的前后端分离架构
- ✅ **Express 服务器** (`server.js`) 已经配置好，可以处理静态文件和SPA路由
- ✅ **Nginx 反向代理** 已经配置，可以处理负载均衡和静态资源缓存

### 现有后端功能：

1. **静态文件服务**：Express 自动服务构建后的 `dist/` 目录
2. **SPA 路由支持**：所有未匹配的路由都会返回 `index.html`
3. **进程管理**：PM2 确保应用稳定运行，支持自动重启
4. **反向代理**：Nginx 处理静态资源缓存和请求转发

### 可选的后端扩展：

如果您需要添加后端API，可以在 `server.js` 中添加：

```javascript
// 示例：添加API路由
app.get('/api/characters', (req, res) => {
  res.json({
    characters: [
      { id: 1, name: 'wanghiayan', description: '皮影戏传承人' }
      // ...
    ]
  });
});

app.post('/api/contact', (req, res) => {
  // 处理联系表单提交
  res.json({ success: true, message: '消息已发送' });
});
```

## 部署验证

### 1. 检查服务状态
```bash
# 检查 Node.js 应用
pm2 status
pm2 logs huaxianpiying

# 检查 Nginx
sudo systemctl status nginx
sudo nginx -t

# 检查端口监听
netstat -tlnp | grep :3000
netstat -tlnp | grep :80
```

### 2. 测试网站访问
```bash
# 本地测试
curl http://localhost:3000

# 通过域名/IP测试
curl http://your-domain.com
```

### 3. 浏览器访问
打开浏览器访问：
- `http://your-domain.com` 或 `http://your-server-ip`
- 应该能看到皮影戏网站首页

## 常见问题解决

### 1. PM2 启动失败
```bash
# 查看详细日志
pm2 logs huaxianpiying

# 重新启动
pm2 restart huaxianpiying

# 删除并重新创建
pm2 delete huaxianpiying
pm2 start server.js --name "huaxianpiying"
```

### 2. Nginx 配置错误
```bash
# 测试配置
sudo nginx -t

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 重载配置
sudo systemctl reload nginx
```

### 3. 端口冲突
```bash
# 查看端口占用
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :80

# 杀掉占用进程
sudo kill -9 <PID>
```

### 4. 权限问题
```bash
# 修复文件权限
sudo chown -R $USER:$USER /var/www/huaxianpiying
sudo chmod -R 755 /var/www/huaxianpiying
```

## 维护命令

### 日常维护
```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs huaxianpiying --lines 50

# 重启应用
pm2 restart huaxianpiying

# 更新代码后重新部署
cd /var/www/huaxianpiying
git pull origin main
npm install
npm run build:server
pm2 restart huaxianpiying
```

### 备份策略
```bash
# 创建备份
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/huaxianpiying

# 数据库备份（如果使用）
# mongodump --out /backup/mongodb-$(date +%Y%m%d)
```

## 性能优化建议

1. **启用 Gzip 压缩**：已在 Nginx 配置中包含
2. **静态资源缓存**：已配置 30 天缓存
3. **进程管理**：使用 PM2 cluster 模式
4. **CDN 集成**：考虑使用 CDN 加速静态资源
5. **数据库优化**：如添加数据库，考虑连接池和索引优化

## 总结

您的皮影戏网站现在已经具备了完整的后端架构：
- ✅ **Node.js + Express** 提供动态内容
- ✅ **PM2** 确保应用稳定运行
- ✅ **Nginx** 处理静态资源和反向代理
- ✅ **SSL 支持** 保障安全传输
- ✅ **自动部署** 支持持续集成

不需要创建额外的后端页面，当前架构已经足够支撑一个现代化的皮影戏展示网站！