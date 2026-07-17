FROM node:18-alpine

WORKDIR /app

# 仅拷贝包配置并安装依赖，利用 Docker 构建缓存
COPY package*.json ./
RUN npm ci --only=production

# 拷贝源代码
COPY index.js ./

# 设置权限
RUN chmod +x index.js

# 设置环境变量的默认值（可选）
ENV ARL_HOST=""
ENV ARL_TOKEN=""

# 使用 node 直接运行
ENTRYPOINT ["node", "index.js"]
