FROM node:current-slim
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
CMD [ "node", "index.js" ]