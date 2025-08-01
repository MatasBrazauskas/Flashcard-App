FROM node:20-alpine

WORKDIR /front

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
