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
  "dockerRegistry": "myDockerProvider.bear.com:8443",
  "scripts": {
    "docker:build": "bear-node-docker docker --publicUrl=/recommend --dockerfile=./node_modules/bear-node-docker/config/dockerfile/react/Dockerfile",
    "docker:push": "bear-node-docker push"
  }
}
```

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
  // "dockerRegistry": "myDockerProvider.bear.com:8443",
  "scripts": {
    "docker:build": "bear-node-docker build --publicUrl=/recommend",
    "docker:push": "bear-node-docker push"
  }
}
```




### [Options] Custom use docker hub pro (docker.io)
package.json
```json
{
  "dockerRegistry": "docker.io/imagine10255",
//  "scripts": {
//    "docker:build": "bear-node-docker build --publicUrl=/recommend",
//    "docker:push": "bear-node-docker push"
//  }
}
```


### [Options] Custom dockerfile path
package.json
```json
{
//  "dockerRegistry": "docker.io/imagine10255",
  "scripts": {
    "docker:build": "bear-node-docker build --dockerfile=./Dockerfile",
//    "docker:push": "bear-node-docker push"
  }
}
```


## License

MIT © [imagine10255](https://github.com/imagine10255)
