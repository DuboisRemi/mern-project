FROM node:17
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
COPY wait-for-it.sh wait-for-it.sh 
EXPOSE 5000
