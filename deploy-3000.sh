#!/bin/bash

# 皮影戏网站一键部署脚本 - 3000端口
# 作者：AI助手
# 版本：1.0

echo "🎭 =========================================="
echo "🎭 皮影戏网站一键部署脚本 (3000端口)"
echo "🎭 =========================================="
echo ""

# 设置颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 函数：打印带颜色的输出
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查Node.js版本
check_node_version() {
    print_status "检查Node.js版本..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        REQUIRED_VERSION="20.0.0"
        
        if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
            print_success "Node.js版本符合要求: $NODE_VERSION"
        else
            print_error "Node.js版本过低，需要 >= 20.0.0，当前版本: $NODE_VERSION"
            print_status "请升级Node.js后重试"
            exit 1
        fi
    else
        print_error "未检测到Node.js，请先安装Node.js >= 20.0.0"
        exit 1
    fi
}

# 检查端口占用
check_port() {
    print_status "检查3000端口占用情况..."
    if command -v netstat &> /dev/null; then
        PORT_CHECK=$(netstat -tulnp 2>/dev/null | grep :3000 || echo "")
        if [ -n "$PORT_CHECK" ]; then
            print_warning "3000端口已被占用："
            echo "$PORT_CHECK"
            read -p "是否继续部署？(y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                print_status "部署已取消"
                exit 1
            fi
        else
            print_success "3000端口可用"
        fi
    else
        print_warning "无法检测端口占用情况（netstat未安装）"
    fi
}

# 安装依赖
install_dependencies() {
    print_status "安装项目依赖..."
    if npm install; then
        print_success "依赖安装完成"
    else
        print_error "依赖安装失败"
        exit 1
    fi
}

# 构建项目
build_project() {
    print_status "构建生产版本..."
    if npm run build:server; then
        print_success "项目构建完成"
    else
        print_error "项目构建失败"
        exit 1
    fi
}

# 检查构建结果
check_build() {
    print_status "检查构建结果..."
    if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
        print_success "构建目录dist存在且包含文件"
        print_status "dist目录内容："
        ls -la dist/
    else
        print_error "构建目录dist不存在或为空"
        exit 1
    fi
}

# 停止现有服务
stop_existing_service() {
    print_status "停止现有服务..."
    if command -v pm2 &> /dev/null; then
        pm2 stop huaxianpiying 2>/dev/null || print_warning "未找到运行中的服务"
        print_success "服务已停止"
    else
        print_warning "PM2未安装，跳过停止步骤"
    fi
}

# 启动服务
start_service() {
    print_status "启动服务..."
    
    # 检查PM2是否安装
    if command -v pm2 &> /dev/null; then
        print_status "使用PM2启动服务..."
        if pm2 start server.js --name "huaxianpiying" --env "NODE_ENV=production,PORT=3000"; then
            print_success "服务启动成功"
            
            # 保存PM2配置
            print_status "保存PM2配置..."
            pm2 save
            
            # 显示状态
            print_status "服务状态："
            pm2 status huaxianpiying
        else
            print_error "PM2启动失败，尝试直接启动..."
            direct_start
        fi
    else
        print_warning "PM2未安装，使用直接启动方式..."
        direct_start
    fi
}

# 直接启动方式
direct_start() {
    print_status "直接启动Node.js服务..."
    nohup node server.js > server.log 2>&1 &
    PID=$!
    sleep 3
    
    if kill -0 $PID 2>/dev/null; then
        print_success "服务启动成功 (PID: $PID)"
        print_status "日志文件: server.log"
    else
        print_error "服务启动失败"
        exit 1
    fi
}

# 测试服务
test_service() {
    print_status "测试服务..."
    sleep 5  # 等待服务完全启动
    
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|302"; then
        print_success "服务测试通过！可以正常访问 http://localhost:3000"
    else
        print_warning "服务测试失败，请检查日志"
        if command -v pm2 &> /dev/null; then
            print_status "查看PM2日志："
            pm2 logs huaxianpiying --lines 20
        else
            print_status "查看日志文件："
            tail -n 20 server.log
        fi
    fi
}

# 显示访问信息
show_access_info() {
    echo ""
    echo "🎭 =========================================="
    echo "🎭 部署完成！"
    echo "🎭 =========================================="
    echo ""
    echo "🌐 访问地址："
    echo "   • 本地访问：http://localhost:3000"
    echo "   • 您的服务器：http://1.95.41.96:3000"
    echo "   • 局域网访问：http://$(hostname -I | awk '{print $1}'):3000"
    echo ""
    echo "📊 管理命令："
    if command -v pm2 &> /dev/null; then
        echo "   • 查看状态：pm2 status"
        echo "   • 查看日志：pm2 logs huaxianpiying"
        echo "   • 停止服务：pm2 stop huaxianpiying"
        echo "   • 重启服务：pm2 restart huaxianpiying"
    else
        echo "   • 查看日志：tail -f server.log"
        echo "   • 停止服务：pkill -f 'node server.js'"
    fi
    echo ""
    echo "📁 项目目录：$(pwd)"
    echo "🕐 部署时间：$(date)"
    echo ""
}

# 主函数
main() {
    # 显示欢迎信息
    echo ""
    echo "🎭 欢迎使用皮影戏网站一键部署脚本！"
    echo ""
    
    # 执行部署步骤
    check_node_version
    check_port
    install_dependencies
    build_project
    check_build
    stop_existing_service
    start_service
    test_service
    show_access_info
    
    print_success "🎉 部署成功！皮影戏网站已在3000端口运行！"
}

# 运行主函数
main "$@"