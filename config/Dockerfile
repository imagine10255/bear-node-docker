FROM node:18.3.0-alpine AS builder
ARG PUBLIC_URL
ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

WORKDIR /opt/app/
COPY ../package.json yarn.lock ./
RUN yarn install --production
COPY .. .
ENV PUBLIC_URL=$PUBLIC_URL
RUN yarn build

# And then copy over node_modules, etc from that stage to the smaller base image
FROM nginx:1.21-alpine
COPY --from=builder /opt/app/build /usr/share/nginx/html
COPY deploy/config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
