FROM node:12
RUN mkdir -p /app/frontend
WORKDIR /app/frontend
COPY /frontend/package.json /app/frontend
RUN npm install -g @angular/cli
RUN npm install
COPY /frontend/. /app/frontend
CMD ["npm", "start"]


