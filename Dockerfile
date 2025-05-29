# ベースイメージを指定
FROM node:24-alpine AS development

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.json と package-lock.json (または yarn.lock) をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションがリッスンするポートを指定 (docker-compose.yml と合わせる)
EXPOSE 3141

# 開発時の起動コマンド
CMD ["npm", "run", "dev"]

# 本番環境用のステージ (オプション)
# FROM node:18-alpine AS production
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm ci --only=production
# COPY --from=development /usr/src/app/dist ./dist
# COPY --from=development /usr/src/app/prisma ./prisma
# CMD ["node", "dist/index.js"]
