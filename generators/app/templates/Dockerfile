FROM node:latest
RUN mkdir /var/api/
ADD ./ /var/api/
RUN cd /var/api/ && npm install --unsafe-perm
CMD cd /var/api && npm start
EXPOSE 80 443
