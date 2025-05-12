# Use official Node.js image
FROM node:18 As build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Build the React app
# RUN npm run build
CMD ["npm" ,"start"]

# Use official Apache image
# FROM httpd:alpine

# Copy the React build files from the previous stage
# COPY --from=build /app/build /usr/local/apache2/htdocs/

# Expose port 80 for Apache to serve the React frontend
# EXPOSE 80

# Apache will automatically serve files from /usr/local/apache2/htdocs/
