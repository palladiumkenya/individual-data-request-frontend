
# Use Ubuntu as the base image
FROM ubuntu:latest

# Set environment variables
ENV NODE_VERSION=18
ENV APP_DIR=/app
ENV PORT 5000

# Update package list and install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY rollup.config.js ./
COPY package*.json ./

#RUN rm -rf package-lock.json
RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./.env ./.env

RUN npm run build:tailwind
RUN npm run build:fontawesome

RUN npm run build

EXPOSE 5000

ENV HOST=0.0.0.0

CMD ["npm", "run", "dev"]
