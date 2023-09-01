FROM node:18-alpine
WORKDIR /src
COPY package.json package-lock.json /src/

# ENV NODE_ENV=production
# RUN npm install --production

ENV NODE_ENV=developmet
RUN npm install 

COPY . /src
EXPOSE 3000

CMD ["npm", "run", "dev"]