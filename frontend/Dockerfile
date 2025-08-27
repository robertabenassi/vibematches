# Dockerfile for Vite/React frontend
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci

ARG VITE_API_URL
RUN echo "VITE_API_URL=$VITE_API_URL" >> .env && \
    echo "VITE_API_URL is $VITE_API_URL" 


# Ensure .env is present before build
RUN ls -l .env && cat .env

COPY . .
RUN  mv .env src/.env
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
