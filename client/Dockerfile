# Use the official Node.js image
FROM node:22-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production (if production build is needed)
RUN npm run build

# Expose the port for the frontend
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
