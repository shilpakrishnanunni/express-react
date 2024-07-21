FROM node:20-alpine

WORKDIR /code

RUN apk --no-cache add mysql-client

COPY package.json ./
COPY package-lock.json ./

RUN npm install


COPY . /code

RUN ls -al

# CMD ["npm", "run", "start-dev"]