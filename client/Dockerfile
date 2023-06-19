# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of the project files to the working directory
COPY . .

# Expose a port for the React app (if necessary)
ENV PORT 3001

# Expose the custom port for the React app
EXPOSE $PORT

# Start the React app with yarn start on the custom port
CMD ["yarn", "start", "--port", "$PORT"]
