FROM node:15.13-alpine
WORKDIR /movies
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
