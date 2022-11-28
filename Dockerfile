FROM node:16-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build \
    && npm prune --proFROM node:16.8-alpine3.11 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN npm ci \
    && npm run build \
    && npm prune --production

# ---

FROM node:16.8-alpine3.11

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

COPY filmesDB.sqlite .

CMD ["node", "dist/main.js"]duction

# ---

FROM node:16-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

COPY .filmesDB.sqlite .

CMD ["node", "dist/server.js"]