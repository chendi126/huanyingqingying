# 皮影戏网站 - 3000端口服务器部署指南

## 🚀 快速部署到3000端口

### 第一步：构建项目
```bash
# 安装依赖
npm install

# 构建生产版本
npm run build:server
```

### 第二步：启动服务器
```bash
# 方法1：直接使用Node.js启动
node server.js
# 输出：Server is running on http://localhost:3000

# 方法2：使用PM2进程管理器启动
pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"

# 方法3：使用PM2配置文件启动
pm2 start ecosystem.config.js
pm2 save  # 保存PM2配置
```

### 第三步：验证部署
```bash
# 检查服务状态
pm2 status

# 查看日志
pm2 logs huaxianpiying

# 测试访问
curl http://localhost:3000
```

## 📋 配置说明

### 当前配置（已优化3000端口）

**server.js配置：**
- ✅ 端口：3000（可通过环境变量PORT修改）
- ✅ 静态文件服务：dist目录
- ✅ SPA路由支持：所有请求返回index.html
- ✅ 控制台输出：显示访问地址

**ecosystem.config.js配置：**
- ✅ 应用名称：huaxianpiying
- ✅ 端口：3000
- ✅ 模式：cluster（多进程）
- ✅ 自动重启：启用
- ✅ 内存限制：500MB自动重启
- ✅ 日志文件：./logs/err.log 和 ./logs/out.log

## 🌐 访问方式

部署成功后，可以通过以下方式访问：

### 您的服务器信息
- **服务器IP**：`1.95.41.96`
- **端口**：`3000`
- **访问地址**：http://1.95.41.96:3000

### 访问方式
1. **本地访问**：http://localhost:3000
2. **您的服务器访问**：http://1.95.41.96:3000
3. **局域网访问**：http://your-server-ip:3000
4. **公网访问**：http://your-domain:3000

## 🔧 常用命令

```bash
# 停止服务
pm2 stop huaxianpiying

# 重启服务
pm2 restart huaxianpiying

# 删除应用
pm2 delete huaxianpiying

# 查看所有应用
pm2 list

# 监控资源使用
pm2 monit

# 开机自启
pm2 startup
pm2 save
```

## 🔒 防火墙配置（如果需要）

```bash
# Ubuntu/Debian
sudo ufw allow 3000/tcp
sudo ufw status

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

## 📝 环境变量配置

可以通过以下方式修改端口：

```bash
# 临时修改端口
PORT=8080 node server.js

# 永久修改端口（编辑ecosystem.config.js）
# 修改 PORT: 8080
```

## 🚀 一键部署脚本

创建 `deploy.sh` 文件：

```bash
#!/bin/bash
echo "🎭 开始部署皮影戏网站到3000端口..."

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build:server

# 停止现有服务
echo "🛑 停止现有服务..."
pm2 stop huaxianpiying 2>/dev/null || true

# 启动新服务
echo "🚀 启动服务..."
pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"

# 保存配置
echo "💾 保存配置..."
pm2 save

echo "✅ 部署完成！访问地址：http://1.95.41.96:3000"
echo "📊 查看状态：pm2 status"
echo "📋 查看日志：pm2 logs huaxianpiying"
```

运行脚本：
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📊 性能监控

```bash
# 实时监控
pm2 monit

# 查看日志
tail -f logs/out.log
tail -f logs/err.log

# 系统资源
top -p $(pgrep -f "node server.js")
```

## 🛠️ 故障排查

### 端口被占用
```bash
# 查看3000端口占用
sudo netstat -tulnp | grep 3000

# 杀掉占用进程
sudo kill -9 <PID>
```

### 服务无法启动
```bash
# 检查Node.js版本
node --version  # 需要 >= 20.0.0

# 检查端口
pm2 logs huaxianpiying

# 检查构建
ls -la dist/
```

### 访问空白页
```bash
# 检查静态文件
ls -la dist/

# 检查服务器日志
pm2 logs huaxianpiying
```

## 📞 技术支持

部署完成后如有问题，请检查：
1. ✅ Node.js版本 >= 20.0.0
2. ✅ 端口3000未被占用
3. ✅ 防火墙允许3000端口
4. ✅ dist目录存在且包含文件
5. ✅ PM2服务状态为online

---

🎭 **皮影戏网站已准备就绪，运行在3000端口！**