FROM node:12

WORKDIR /server/server.js

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "start"]


