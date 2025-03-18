# Rebuild the source code only when needed
FROM node:14.19.2 AS builder
WORKDIR /app
COPY . .
RUN export NODE_OPTIONS=--max_old_space_size=8192
RUN yarn install
RUN yarn build

# Production image, copy all the files and run next
FROM nginx:1.15.2-alpine AS runner
WORKDIR /app

ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder --chmod=0777 /app/build /var/www
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

#ENTRYPOINT ["nginx","-g","daemon off;"]
