# Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
