FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV JWT_SECRET=n3st4pp
EXPOSE 3000
CMD ["npm", "run", "start"]
