FROM node:14.18.1
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . . 

VOLUME /app/logs

RUN npm run build 

RUN npm install -g serve

