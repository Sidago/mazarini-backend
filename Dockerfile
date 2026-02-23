FROM node:24.13

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=5001

EXPOSE 5001

CMD ["npm", "run", "dev"]
