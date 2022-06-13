# Stage 0: prepare node alpine image
FROM node:12-alpine AS base
RUN apk add --update --no-cache \
  python3 \
  make \
  g++

## Stage 1: build the wallet 
FROM base AS builder-demo
WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./ /usr/src/app/
ARG REACT_APP_DEMO
ARG REACT_APP_API_URL
ARG REACT_APP_IDENTITY_PROVIDER
ARG REACT_APP_REDIRECT_CALLBACK
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_WS_URL
ARG REACT_APP_API_KEY
ARG PUBLIC_URL=/demo/university
RUN npm run build

# Stage 2: run nginx
FROM nginx
RUN mkdir -p /app
WORKDIR /app
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
  chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid
USER nginx
COPY --from=builder-demo /usr/src/app/build /app

COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3024
CMD ["nginx", "-g", "daemon off;"]