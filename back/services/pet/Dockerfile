FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install mysql2 --save

COPY . .

EXPOSE 4008

CMD ["npm", "start"]
