FROM node:20-alpine
WORKDIR /app
COPY ./dist/apps/tm-tasks-api . 
RUN npm i
# Add /usr/local/bin to the PATH
ENV PATH="/usr/local/bin:$PATH"
EXPOSE 3000
CMD ["node", "main.js"] 
