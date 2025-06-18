# stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production --output-path dist/marketplace-ng/browser

# stage 2: serve
FROM nginx:alpine
ARG NGINX_CONF=nginx.conf
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/marketplace-ng/browser /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx","-g","daemon off;"]