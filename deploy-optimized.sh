#!/bin/bash

# 华县皮影网站 - 优化部署脚本
# 解决字体和样式加载问题

set -e  # 遇到错误立即退出

echo "🎭 华县皮影网站 - 优化部署"
echo "================================"

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 错误: 未安装 Node.js${NC}"
    echo "请先安装 Node.js 20+ 版本"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${YELLOW}⚠️  警告: Node.js 版本过低 (当前: $(node -v))${NC}"
    echo "建议使用 Node.js 20+ 版本"
fi

# 检查 PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2 未安装，正在安装...${NC}"
    npm install -g pm2
fi

echo ""
echo -e "${GREEN}📦 步骤 1/5: 清理旧文件${NC}"
rm -rf dist node_modules/.vite

echo ""
echo -e "${GREEN}📦 步骤 2/5: 安装依赖${NC}"
npm install

echo ""
echo -e "${GREEN}🔨 步骤 3/5: 构建项目${NC}"
npm run build:server

echo ""
echo -e "${GREEN}✅ 步骤 4/5: 验证构建${NC}"

# 检查 dist 目录
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ 错误: dist 目录不存在${NC}"
    exit 1
fi

# 检查 public 目录中的字体文件
echo "检查字体文件..."
FONT_FILES=("HYNianHuaSongU.ttf" "HYWenRunSongYunU.ttf" "yunxiWord.ttf")
for font in "${FONT_FILES[@]}"; do
    if [ -f "public/$font" ]; then
        echo -e "  ✓ $font"
    else
        echo -e "${YELLOW}  ⚠️  警告: 缺少字体文件 $font${NC}"
    fi
done

# 检查关键文件
echo "检查关键文件..."
if [ -f "dist/index.html" ]; then
    echo "  ✓ index.html"
else
    echo -e "${RED}  ❌ 缺少 index.html${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🚀 步骤 5/5: 启动服务${NC}"

# 停止旧进程
pm2 delete huaxianpiying 2>/dev/null || true

# 启动新进程
PORT=${PORT:-3000}
pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=$PORT"

# 保存 PM2 配置
pm2 save

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✅ 部署完成！${NC}"
echo ""
echo "📊 服务状态:"
pm2 status

echo ""
echo "🌐 访问地址:"
echo "  • 本地: http://localhost:$PORT"
echo "  • 服务器: http://$(hostname -I | awk '{print $1}'):$PORT"
echo ""
echo "📝 常用命令:"
echo "  • 查看日志: pm2 logs huaxianpiying"
echo "  • 重启服务: pm2 restart huaxianpiying"
echo "  • 停止服务: pm2 stop huaxianpiying"
echo ""
echo -e "${YELLOW}💡 提示: 如果字体仍未显示，请清除浏览器缓存后重试${NC}"

