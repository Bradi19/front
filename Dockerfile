FROM node:17.5.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci -q
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./
EXPOSE 8000
# start app
CMD ["npm","run", "build"]