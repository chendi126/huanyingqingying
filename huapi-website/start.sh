#!/bin/bash

# 创建日志目录
mkdir -p logs

# 启动应用
pm2 start server.js --name huaxianpiying --env NODE_ENV=production,PORT=3000

# 保存配置
pm2 save

