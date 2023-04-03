# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code to the container
COPY . .

# Build the app
RUN npm run build

# Expose port 3000 for the React app
EXPOSE 3000

# # Start the app
CMD ["npm", "start"]