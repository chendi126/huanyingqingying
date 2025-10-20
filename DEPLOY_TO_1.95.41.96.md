# 皮影戏网站部署指南 - 服务器 1.95.41.96

## 🎯 服务器信息
- **IP地址**：`1.95.41.96`
- **端口**：`3000`
- **访问地址**：http://1.95.41.96:3000
- **项目目录**：`/var/www/huaxianpiying`

## 🚀 快速部署步骤

### 第一步：连接到服务器
```bash
ssh root@1.95.41.96
# 或者使用您的用户名
ssh your-username@1.95.41.96
```

### 第二步：准备环境
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装PM2
sudo npm install -g pm2

# 安装Nginx（可选，用于反向代理）
sudo apt install nginx -y
```

### 第三步：部署项目
```bash
# 创建项目目录
sudo mkdir -p /var/www/huaxianpiying
cd /var/www/huaxianpiying

# 上传项目文件（多种方式）
# 方式1：使用Git
git clone https://github.com/chendi126/huanyingqingying.git .

# 方式2：使用SCP上传本地文件
# scp -r /path/to/your/local/project/* root@1.95.41.96:/var/www/huaxianpiying/

# 方式3：使用FTP/SFTP客户端上传
```

### 第四步：安装依赖和构建
```bash
# 安装依赖
npm install

# 构建项目
npm run build:server

# 验证构建结果
ls -la dist/
```

### 第五步：启动应用
```bash
# 使用PM2启动
pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"

# 保存PM2配置
pm2 save

# 设置开机自启
pm2 startup
```

### 第六步：配置防火墙
```bash
# Ubuntu/Debian系统
sudo ufw allow 3000/tcp
sudo ufw status

# CentOS/RHEL系统
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

### 第七步：配置Nginx反向代理（可选）
```bash
# 创建Nginx配置文件
sudo nano /etc/nginx/sites-available/huaxianpiying

# 添加以下配置
server {
    listen 80;
    server_name 1.95.41.96;
    
    # 日志
    access_log /var/log/nginx/huaxianpiying_access.log;
    error_log /var/log/nginx/huaxianpiying_error.log;
    
    # 静态文件缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 30d;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # 反向代理到 Node.js 应用
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
    }
}

# 启用配置
sudo ln -s /etc/nginx/sites-available/huaxianpiying /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 📋 验证部署

### 检查服务状态
```bash
# 查看PM2状态
pm2 status

# 查看应用日志
pm2 logs huaxianpiying

# 测试本地访问
curl http://localhost:3000

# 测试公网访问
curl http://1.95.41.96:3000
```

### 浏览器访问
打开浏览器访问：http://1.95.41.96:3000

## 🔧 管理命令

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs huaxianpiying

# 重启服务
pm2 restart huaxianpiying

# 停止服务
pm2 stop huaxianpiying

# 删除应用
pm2 delete huaxianpiying

# 监控资源
pm2 monit
```

## 🛡️ 安全建议

### 1. 配置域名和SSL（推荐）
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取SSL证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

### 2. 使用非root用户运行
```bash
# 创建新用户
sudo adduser huaxianpiying
sudo usermod -aG sudo huaxianpiying

# 切换到新用户
su - huaxianpiying

# 重新部署项目
cd /var/www/huaxianpiying
npm install
npm run build:server
pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"
```

### 3. 配置防火墙
```bash
# 只允许必要的端口
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3000/tcp  # 应用端口
sudo ufw enable
```

## 📊 性能优化

### 1. PM2集群模式
```bash
# 使用所有CPU核心
pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000" -i max
```

### 2. 系统优化
```bash
# 增加文件描述符限制
echo "fs.file-max = 100000" >> /etc/sysctl.conf
sysctl -p

# 优化Node.js内存
export NODE_OPTIONS="--max-old-space-size=4096"
```

## 🚀 一键部署脚本

创建 `deploy-to-1.95.41.96.sh`：

```bash
#!/bin/bash

# 皮影戏网站部署脚本 - 服务器 1.95.41.96
# 一键部署到您的服务器

SERVER_IP="1.95.41.96"
PROJECT_DIR="/var/www/huaxianpiying"

echo "🎭 开始部署皮影戏网站到服务器 $SERVER_IP..."

# 连接到服务器并执行部署
ssh root@$SERVER_IP << EOF
  echo "📦 更新系统..."
  apt update && apt upgrade -y
  
  echo "📥 安装Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
  
  echo "📥 安装PM2..."
  npm install -g pm2
  
  echo "📁 创建项目目录..."
  mkdir -p $PROJECT_DIR
  cd $PROJECT_DIR
  
  echo "📥 克隆项目..."
  git clone https://github.com/chendi126/huanyingqingying.git .
  
  echo "📦 安装依赖..."
  npm install
  
  echo "🔨 构建项目..."
  npm run build:server
  
  echo "🚀 启动服务..."
  pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"
  pm2 save
  
  echo "🔥 配置防火墙..."
  ufw allow 3000/tcp
  
  echo "✅ 部署完成！"
EOF

echo "🎉 部署成功！访问地址：http://$SERVER_IP:3000"
```

## 📞 故障排查

### 无法访问
1. 检查服务状态：`pm2 status`
2. 检查端口监听：`netstat -tulnp | grep 3000`
3. 检查防火墙：`ufw status`
4. 检查云服务安全组设置

### 页面空白
1. 检查构建结果：`ls -la dist/`
2. 查看错误日志：`pm2 logs huaxianpiying`
3. 检查静态文件路径

### 性能问题
1. 监控资源使用：`pm2 monit`
2. 查看系统负载：`top`
3. 优化Nginx配置

## 📋 日常维护

### 更新项目
```bash
cd /var/www/huaxianpiying
git pull origin main
npm install
npm run build:server
pm2 restart huaxianpiying
```

### 备份数据
```bash
# 备份项目文件
tar -czf huaxianpiying-backup-$(date +%Y%m%d).tar.gz /var/www/huaxianpiying

# 备份PM2配置
pm2 save
```

---

🎭 **您的皮影戏网站已准备就绪！**
**访问地址**：http://1.95.41.96:3000

如有问题，请检查服务状态或查看日志。