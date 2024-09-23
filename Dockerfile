FROM node:current-slim
RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
CMD [ "node", "index.js" ]