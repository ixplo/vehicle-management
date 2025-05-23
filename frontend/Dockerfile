# stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# stage 2: serve
FROM nginx:alpine
COPY --from=builder /app/dist/your-app-name /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]