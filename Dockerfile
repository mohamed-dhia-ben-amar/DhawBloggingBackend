# This line specifies the base image for your Docker image.
#In this case, it uses the official Node.js image with version 16 as the base image.
FROM node:16

#This line is used to add metadata to the image. It specifies the maintainer's contact information.
LABEL maintainer="Mohamed Dhia Ben Amar <mohameddhia.benamar@esprit.tn>"

#It's common to create a separate directory for your application within the container, and changing ownership to a non-root user (in this case, the node user) is a best practice for security.
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

#it means that subsequent commands will be executed in this directory unless explicitly stated otherwise.
WORKDIR /home/node/app

#This line copies the package.json and package-lock.json (if it exists) from your local directory to the current working directory of the container. This is done to install the dependencies of your Node.js application.
COPY package*.json ./

#Here, it installs the Node.js application's dependencies using the npm package manager. The --production flag ensures that only production dependencies (dependencies listed in the dependencies section of package.json) are installed.
RUN npm install --production

#This line copies all the files and directories from your local directory to the current working directory of the container.
COPY . .

# It changes the ownership of all files and directories in /home/node/app to the node user.
RUN chown -R node:node /home/node/app

#This sets the user that the container runs as to the node user.
USER node

#This line informs Docker that the container will listen on port 3000.
EXPOSE 3000

# This sets the default command to run when the container is started.
CMD ["node", "index.js"]