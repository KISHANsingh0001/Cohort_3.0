# base image
FROM node:22-alpine
# working Dir
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY . .
 

EXPOSE 3000
# when container starts what do we want to run 
CMD [ "node" , "index.js" ]

