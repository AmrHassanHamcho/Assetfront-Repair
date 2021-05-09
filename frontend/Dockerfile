FROM node:12
RUN mkdir -p /app/frontend
WORKDIR /app/frontend
COPY package.json /app/frontend
RUN npm install -g @angular/cli
RUN npm install
COPY . /app/frontend
CMD ["npm", "start"]
EXPOSE 4200


