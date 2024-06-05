# Use the official Node.js 16 image.
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copy both package.json AND package-lock.json
COPY package*.json ./

# Install dependencies including 'typescript' and 'ts-node'
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your TypeScript
RUN npm run build

# Your app will bind to port 3000, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "dist/index.js" ]