FROM node:carbon

ADD frontend /paste-app

WORKDIR /paste-app

RUN npm install

RUN ./node_modules/.bin/ng build --prod

EXPOSE 4200

CMD node server.js
