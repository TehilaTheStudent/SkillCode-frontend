FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set environment explicitly to development
ENV NODE_ENV=development

EXPOSE 3000

# Use Nuxt development server
CMD ["npm", "run", "dev"]
