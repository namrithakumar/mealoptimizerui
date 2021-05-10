FROM node:16-alpine3.11 as builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
COPY . .
RUN npm run build-test

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/
RUN rm -rf ./*
COPY --from=builder /usr/src/app/dist/mealoptimizerui/ /usr/share/nginx/html

EXPOSE 80
# start app
CMD ["nginx","-g","daemon off;"]