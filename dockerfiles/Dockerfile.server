# ...........
# Build stage
# ...........
FROM node:lts-slim as BUILD_STAGE
WORKDIR /app
COPY . .
RUN npm install --quite
RUN npm run lint:server
RUN npm run build:server

# ................
# Production stage
# ................
FROM node:lts-alpine as PRODUCTION-STAGE
WORKDIR /app
COPY package*.json .
RUN npm install --production --quite
COPY --from=BUILD_STAGE /app/dist/server ./

EXPOSE 3000
ENV NODE_ENV production
CMD ["npm", "run", "start"]

