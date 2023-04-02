# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install
RUN apk update && apk add nodejs && npm i -g nodemon

# Copy the rest of the app code to the container
COPY . .

# Expose port 5000 for the Express app
EXPOSE 5000

# Start the app
CMD ["nodemon", "./server.js", "localhost 5000"]