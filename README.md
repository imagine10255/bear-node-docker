# bear-script

> Common tools and methods for project development

[![NPM](https://img.shields.io/npm/v/bear-script.svg)](https://www.npmjs.com/package/bear-script)
[![npm](https://img.shields.io/npm/dm/bear-script.svg)](https://www.npmjs.com/package/bear-script)


## Install

```bash
yarn add -D bear-script
```

## Setting

```bash
$ cp ./node_modules/bear-script/config/nginx ./deploy/nginx
```

in your package.json
```json
{
  "dockerRegistry": "docker.bearests.com:8443",
  "scripts": {
    "build": "react-scripts build",
    "publish": "yarn bear-script docker --publicUrl=/recommend --dockerfile=./node_modules/bear-script/config/Dockerfile"
  }
}
```

### Options Custom dockerfile
```bash
$ cp ./node_modules/bear-script/config/Dockerfile ./ 
```

package.json
```json
{
  "dockerRegistry": "docker.bearests.com:8443",
  "scripts": {
    "build": "react-scripts build",
    "publish": "yarn bear-script docker --publicUrl=/recommend"
  }
}
```



## License

MIT © [imagine10255](https://github.com/imagine10255)
