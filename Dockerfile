FROM node

RUN echo deb http://ftp.fr.debian.org/debian/ jessie main contrib non-free > /etc/apt/source.list

RUN apt-get update -y

RUN apt-get install -y \
    python2.7 python-pip \
    libfreetype6 libfontconfig

RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app

COPY . /usr/local/app/

RUN npm install

EXPOSE  3000
CMD ["node", "server.js"]
