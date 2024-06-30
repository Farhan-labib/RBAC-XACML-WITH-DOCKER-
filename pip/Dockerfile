# Use Node.js version 14
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose port 8080
EXPOSE 8080

# Command to run the PIP server
CMD ["node", "server.js"]
