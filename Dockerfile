# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy application code

COPY --link package-lock.json package.json ./
# Install frozen dependencies
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

CMD [ "npm", "start", "--", "--port", "3005" ]
