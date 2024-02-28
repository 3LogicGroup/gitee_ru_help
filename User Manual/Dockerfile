# 依赖安装
FROM node:16.18.1 as deps
WORKDIR /app/website
COPY website/package.json website/package-lock.json website/.npmrc website/.nvmrc ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm install

FROM node:16.18.1
ENV NPM_CONFIG_REGISTRY=https://registry.npm.taobao.org
WORKDIR /app/website
COPY --from=deps /app/website/node_modules ./node_modules
COPY website /app/website
COPY docs /app/docs
RUN npm run build-fonts
RUN npm run build
EXPOSE 3000
CMD ["bash", "-c", "cd /app/website && yarn run serve --port 3000 --host 0.0.0.0"]