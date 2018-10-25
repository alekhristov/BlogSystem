FROM node

RUN mkdir /app
WORKDIR /app

COPY package.json /app/
RUN npm install --verbose
COPY . /app

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"] 
