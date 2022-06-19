# bear-deploy

> Common tools and methods for project development

[![NPM](https://img.shields.io/npm/v/bear-deploy.svg)](https://www.npmjs.com/package/bear-deploy)
[![npm](https://img.shields.io/npm/dm/bear-deploy.svg)](https://www.npmjs.com/package/bear-deploy)


## Install

```bash
yarn add -D bear-deploy
```

## Setting

```bash
$ cp ./node_modules/bear-deploy/config/nginx ./deploy/nginx
```

in your package.json
```json
{
  "dockerRegistry": "docker.bearests.com:8443",
  "scripts": {
    "build": "react-scripts build",
    "build:docker": "NODE_ENV=production yarn bear-deploy --publicUrl=/recommend --dockerfile=./node_modules/bear-deploy/config/Dockerfile"
  }
}
```

### Options Custom dockerfile
```bash
$ cp ./node_modules/bear-deploy/config/Dockerfile ./ 
```

package.json
```json
{
  "dockerRegistry": "docker.bearests.com:8443",
  "scripts": {
    "build": "react-scripts build",
    "build:docker": "NODE_ENV=production yarn bear-deploy --publicUrl=/recommend"
  }
}
```



## License

MIT © [imagine10255](https://github.com/imagine10255)
