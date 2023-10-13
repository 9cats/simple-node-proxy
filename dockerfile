# 使用官方的Node.js基础镜像
FROM node:14

# 工作目录
WORKDIR /usr/src/app

# 将你的package.json和package-lock.json复制到容器中
COPY package*.json ./

# 安装应用程序的所有依赖项
RUN npm install

# 将应用程序的其余部分复制到容器中
COPY . .

# 指定容器应该监听的端口
EXPOSE 3000

# 定义容器启动时运行的命令
CMD ["node", "index.js"]