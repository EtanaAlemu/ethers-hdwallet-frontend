FROM node:18-alpine AS development
WORKDIR /app
COPY package.json package-lock.json /app/

# ENV NODE_ENV=production
# RUN npm install --production

ENV NODE_ENV=developmet
RUN npm install 

COPY . /app
EXPOSE 3000

CMD ["npm", "run", "dev"]