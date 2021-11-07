FROM node:14-alpine

WORKDIR /src
ENV PATH /src/node_modules/.bin:$PATH
COPY package.json package-lock.json /src/
RUN npm install && npm install react-script
COPY . /src
RUN npm run build

CMD ["npm", "start"]