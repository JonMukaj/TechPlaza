# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code to the container
COPY . .

# Expose port 5000 for the Server
EXPOSE 5000

# Start the app
CMD ["node", "./server.js"]