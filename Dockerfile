FROM node:latest
WORKDIR /app
EXPOSE 3001

# Setup node
COPY package.json ./
RUN npm install

# Copy src code
COPY ./src ./src

# Start
CMD ["npm", "start"]

