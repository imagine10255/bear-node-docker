# bear-react-docker

> Common tools and methods for react project deploy to docker

[![NPM](https://img.shields.io/npm/v/bear-react-docker.svg)](https://www.npmjs.com/package/bear-react-docker)
[![npm](https://img.shields.io/npm/dm/bear-react-docker.svg)](https://www.npmjs.com/package/bear-react-docker)


## Install

```bash
yarn add -D bear-react-docker
```



## Setting

```bash
$ cp ./node_modules/bear-react-docker/config/nginx ./deploy/nginx
```

in your package.json
```json
{
  "dockerRegistry": "docker.bearests.com:8443",
  "scripts": {
    "docker:build": "bear-react-docker docker --publicUrl=/recommend --dockerfile=./node_modules/bear-react-docker/config/Dockerfile",
    "docker:push": "bear-react-docker push && bear-react-docker remove"
  }
}
```

### [Options] Custom dockerfile
```bash
$ cp ./node_modules/bear-react-docker/config/Dockerfile ./ 
```

package.json
```json
{
  "dockerRegistry": "docker.bearests.com:8443",
  "scripts": {
    "docker:build": "bear-react-docker build --publicUrl=/recommend",
    "docker:push": "bear-react-docker push && bear-react-docker remove"
  }
}
```


## License

MIT © [imagine10255](https://github.com/imagine10255)
