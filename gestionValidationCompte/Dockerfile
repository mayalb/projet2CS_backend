FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /src/
EXPOSE 8000
RUN npm ci
COPY . /src


FROM base as production
ENV NODE_ENV=production

RUN npm run build
CMD ["node", "build/"]

FROM base as development
ENV NODE_ENV=development
CMD ["npm", "run", "start:dev"]
