FROM node:16.5.0-alpine
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY urls.json .
COPY prisma/migrations prisma
COPY prisma/schema.prisma prisma/
COPY src src
RUN npm install
RUN ls
RUN npm run build
RUN rm -rf src
ENV NODE_ENV production
CMD [ "node", "dist/src/app.js"]