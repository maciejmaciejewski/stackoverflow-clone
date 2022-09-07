FROM node:18-alpine

COPY node_modules node_modules
COPY controllers controllers
COPY models models
COPY utils utils
COPY middlewares middlewares
COPY ["index.js", "app.js", "config.js", "routes.js", "./"]
WORKDIR .

CMD ["node", "index.js"]
