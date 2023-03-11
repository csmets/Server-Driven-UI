FROM node:18.14-alpine

WORKDIR /app
COPY . .
RUN npm ci
CMD ["npm", "run", "watch"]
EXPOSE 9090