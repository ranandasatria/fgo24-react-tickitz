FROM ubuntu:noble

WORKDIR /workspace

RUN apt-get update && apt-get install nginx nodejs npm -y

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build
RUN cp -r dist/* /var/www/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
