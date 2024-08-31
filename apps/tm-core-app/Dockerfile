FROM node:20-alpine
WORKDIR /app
COPY ./dist/apps/tm-core-app . 
COPY ./apps/tm-core-app/bs-config.json .
RUN npm i lite-server -g
# Add /usr/local/bin to the PATH
ENV PATH="/usr/local/bin:$PATH"
EXPOSE 4200
CMD ["lite-server", "index.html"] 
