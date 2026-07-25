FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source and build
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]