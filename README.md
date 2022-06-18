# bear-deploy

> Common tools and methods for project development

[![NPM](https://img.shields.io/npm/v/bear-deploy.svg)](https://www.npmjs.com/package/bear-deploy)
[![npm](https://img.shields.io/npm/dm/bear-deploy.svg)](https://www.npmjs.com/package/bear-deploy)


## Install

```bash
yarn add -D bear-deploy
```

## Setting

in your package.json
```tsx
"dockerRegistry": "docker.bearests.com:8443",
"scripts": {
    "release:docker": "NODE_ENV=production yarn bear-deploy"
},

```

create Dockerfile in your root dir

## License

MIT © [imagine10255](https://github.com/imagine10255)
