#!/bin/bash

# 皮影戏网站快速启动脚本 - 3000端口
# 简化版本，快速启动

echo "🎭 启动皮影戏网站 (3000端口)..."
echo "🌐 服务器IP：1.95.41.96"

# 检查dist目录是否存在
if [ ! -d "dist" ]; then
    echo "📦 构建项目..."
    npm run build:server
fi

# 使用PM2启动（如果已安装）
if command -v pm2 &> /dev/null; then
    echo "🚀 使用PM2启动服务..."
    pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"
    echo "✅ 服务已启动！访问："
    echo "   • 本地访问：http://localhost:3000"
    echo "   • 服务器访问：http://1.95.41.96:3000"
    echo "📊 查看状态：pm2 status"
else
    echo "🚀 直接启动服务..."
    node server.js
fi