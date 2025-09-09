FROM node:20-alpine
WORKDIR /Compiler
RUN apk update && apk add --no-cache g++ openjdk11 python3
COPY package.json .
RUN npm i
COPY . .
EXPOSE 8000
CMD ["node","compiler.js"]