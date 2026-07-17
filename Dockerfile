########################################
# 1) Build stage (Rollup)
########################################
FROM --platform=$BUILDPLATFORM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY rollup.config.js ./
COPY scripts ./scripts
COPY public ./public
COPY src ./src

# 빌드 시점에 번들로 주입되는 서비스 도메인
# (로컬 docker 데모: 어드민 툴 링크가 http://localhost:8880/admin-front/ 를 가리키도록 설정)
ARG SERVICE_DOMAIN=http://localhost:8880
ENV SERVICE_DOMAIN=$SERVICE_DOMAIN

RUN npm run build

########################################
# 2) Runtime stage (nginx 정적 서빙)
########################################
FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
