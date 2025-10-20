# 🎭 皮影戏网站部署总结 - 服务器 1.95.41.96

## 🌐 部署信息概览

### 服务器配置
- **服务器IP**：`1.95.41.96`
- **应用端口**：`3000`
- **访问地址**：http://1.95.41.96:3000
- **项目路径**：`/var/www/huaxianpiying` (推荐)

### 应用架构
- **前端框架**：React 19 + Vite
- **后端服务器**：Express.js (Node.js 20+)
- **进程管理**：PM2
- **反向代理**：Nginx (可选)
- **构建工具**：Vite

## 🚀 快速部署命令

### 一键部署脚本
```bash
# 使用完整部署脚本
curl -fsSL https://raw.githubusercontent.com/chendi126/huanyingqingying/main/deploy-3000.sh | bash

# 或者手动执行
git clone https://github.com/chendi126/huanyingqingying.git
cd huanyingqingying/huapi-website
chmod +x deploy-3000.sh
./deploy-3000.sh
```

### 手动部署步骤
```bash
# 1. 安装依赖
npm install

# 2. 构建项目
npm run build:server

# 3. 启动服务
pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"

# 4. 保存配置
pm2 save
```

## 📁 项目文件说明

### 核心文件
- `server.js` - Express服务器，端口3000
- `ecosystem.config.js` - PM2进程管理配置
- `nginx.conf` - Nginx反向代理配置
- `deploy-3000.sh` - 一键部署脚本
- `start-3000.sh` - 快速启动脚本

### 部署文档
- `DEPLOY_TO_SERVER_PORT_3000.md` - 3000端口部署指南
- `DEPLOY_TO_1.95.41.96.md` - 针对您服务器的详细部署指南
- `DEPLOY_TO_SERVER.md` - 通用Linux服务器部署指南

## 🌐 访问方式

### 当前可用访问地址
1. **您的服务器**：http://1.95.41.96:3000 ⭐ **主要访问地址**
2. **本地测试**：http://localhost:3000
3. **局域网访问**：http://内网IP:3000

### 域名配置（可选）
如果您有域名，可以配置域名解析到 `1.95.41.96`，然后通过域名访问。

## 🔧 管理维护

### 常用管理命令
```bash
# 查看服务状态
pm2 status

# 查看实时日志
pm2 logs huaxianpiying

# 重启服务
pm2 restart huaxianpiying

# 停止服务
pm2 stop huaxianpiying

# 监控资源使用
pm2 monit
```

### 更新项目
```bash
# 拉取最新代码
git pull origin main

# 重新构建
npm run build:server

# 重启服务
pm2 restart huaxianpiying
```

### 备份建议
```bash
# 备份项目文件
tar -czf huaxianpiying-backup-$(date +%Y%m%d-%H%M%S).tar.gz /var/www/huaxianpiying

# 备份PM2配置
pm2 save
```

## 🛡️ 安全建议

### 基础安全配置
1. **配置防火墙**：只允许必要的端口（22, 80, 443, 3000）
2. **使用非root用户**：创建专用用户运行应用
3. **定期更新**：保持系统和依赖包更新
4. **监控日志**：定期检查应用日志

### 进阶安全配置
1. **配置SSL证书**：使用Let's Encrypt免费SSL
2. **设置 fail2ban**：防止暴力破解
3. **定期备份**：设置自动备份脚本
4. **监控告警**：配置系统监控告警

## 📊 性能优化

### 已优化的配置
- ✅ PM2集群模式（多进程）
- ✅ 静态资源30天缓存
- ✅ Gzip压缩
- ✅ 内存限制自动重启（500MB）
- ✅ 自动故障恢复

### 可进一步优化
1. **CDN加速**：使用CDN加速静态资源
2. **数据库优化**：如果有数据库需求
3. **负载均衡**：多服务器部署
4. **缓存策略**：Redis等缓存方案

## 🆘 常见问题排查

### 无法访问 http://1.95.41.96:3000
1. **检查服务状态**：`pm2 status`
2. **检查端口监听**：`netstat -tulnp | grep 3000`
3. **检查防火墙**：`ufw status` 或 `firewall-cmd --list-all`
4. **检查云服务安全组**：确认3000端口已开放

### 页面显示空白
1. **检查构建结果**：`ls -la dist/`
2. **查看错误日志**：`pm2 logs huaxianpiying`
3. **检查静态文件路径**

### 服务频繁崩溃
1. **查看详细日志**：`pm2 logs huaxianpiying --lines 50`
2. **检查内存使用**：`pm2 monit`
3. **检查系统资源**：`top` 或 `htop`

## 📞 技术支持

### 自助排查清单
- [ ] Node.js版本 >= 20.0.0
- [ ] 端口3000未被占用
- [ ] 防火墙允许3000端口
- [ ] 云服务安全组开放3000端口
- [ ] dist目录存在且包含文件
- [ ] PM2服务状态为online

### 日志查看
```bash
# 应用日志
pm2 logs huaxianpiying

# 系统日志
sudo journalctl -u pm2-root -f

# Nginx日志（如果配置了）
sudo tail -f /var/log/nginx/huaxianpiying_error.log
```

## 🎉 部署完成！

🎭 **您的皮影戏网站已成功配置！**

**主要访问地址**：http://1.95.41.96:3000

**管理命令**：
- 查看状态：`pm2 status`
- 查看日志：`pm2 logs huaxianpiying`
- 重启服务：`pm2 restart huaxianpiying`

---

*最后更新：$(date)*
*服务器IP：1.95.41.96*
*应用端口：3000*