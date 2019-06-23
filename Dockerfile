FROM node:11.11.0-alpine

RUN apt update && apt install curl autoconf coreutils python && npm install -g nodemon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm i

EXPOSE 3000

CMD ["nodemon"]
