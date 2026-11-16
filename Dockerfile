FROM node:20-alpine

WORKDIR /opt/app

# The build runs the same steps as CI. Dev dependencies (TypeScript, ESLint)
# are needed for `next build`, so install everything first.
COPY package*.json ./
RUN npm ci

COPY . .

# Backend the site reads listings from at build and revalidate time.
ARG NEXT_API_ENDPOINT
ENV NEXT_API_ENDPOINT=$NEXT_API_ENDPOINT
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

EXPOSE 3003

CMD ["npm", "start"]
