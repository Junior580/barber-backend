FROM node:14-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["sh", "/usr/api/entrypoint.sh"]
