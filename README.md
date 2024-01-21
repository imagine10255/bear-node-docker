# bear-node-docker

> Common tools build docker image for node project development

[![NPM](https://img.shields.io/npm/v/bear-node-docker.svg)](https://www.npmjs.com/package/bear-node-docker)
[![npm](https://img.shields.io/npm/dm/bear-node-docker.svg)](https://www.npmjs.com/package/bear-node-docker)


## Install

```bash
yarn add -D bear-node-docker
```



## Setting

```bash
$ cp ./node_modules/bear-node-docker/config/nginx ./deploy/nginx
```

in your package.json
```json
{
   "dockerRegistry": "docker.io/imagine10255",
   "scripts": {
     "docker:build": "bear-node-docker docker --dockerfile=./node_modules/bear-node-docker/config/dockerfile/react/Dockerfile",
     "docker:push": "bear-node-docker push"
   }
}
```

imagine10255 is your dockerhub account



### [Options] Custom dockerfile in root type command
```bash
# react
$ cp ./node_modules/bear-node-docker/config/dockerfile/react/Dockerfile ./

# nest 
$ cp ./node_modules/bear-node-docker/config/dockerfile/nest/Dockerfile ./ 
```

package.json
```json
{
    "scripts": {
      "docker:build": "bear-node-docker build --dockerfile=./Dockerfile"
    }
}
```




### [Options] Custom use provider docker registry

package.json
```json
{
   "dockerRegistry": "myDockerProvider.bear.com:8443"
}
```


### [Options] Custom publicUrl

package.json

```json
{
  "scripts": {
    "docker:build": "bear-node-docker build --publicUrl=/recommend  --dockerfile=./Dockerfile"
  }
}
```


### Only packaged into docker image

In some old projects, npm build gets stuck when run inside Docker. In such cases, you can build locally and then only put the build path into the Docker image.

Dockerfile
```dockerfile
# And then copy over node_modules, etc from that stage to the smaller base image
FROM nginx:1.19-alpine
COPY build /usr/share/nginx/html
COPY deploy/config-nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

> Be aware that `.dockerignore` should not include the build folder (the default for `create-react-app` is 'build', while for `Vite` it's 'dist').


package.json
```json
{
  "scripts": {
      "build": "react-scripts build",
      "docker:build": "yarn build && bear-node-docker build --publicUrl=/recommend  --dockerfile=./Dockerfile"
  }
}
```

### Test

```bash
ts-node lib/build-docker/node-run.ts
```


## License

MIT © [imagine10255](https://github.com/imagine10255)
