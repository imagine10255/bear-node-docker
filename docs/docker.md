# bear-react-docker docker

> build docker image by reactjs


## Setting

```bash
$ cp ./node_modules/bear-react-docker/config/nginx ./deploy/nginx
```

in your package.json
```json
{
  "dockerRegistry": "docker.bearests.com:8443",
  "scripts": {
    "build": "react-scripts build",
    "publish": "yarn bear-react-docker docker --publicUrl=/recommend --dockerfile=./node_modules/bear-react-docker/config/Dockerfile"
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
    "build": "react-scripts build",
    "publish": "yarn bear-react-docker docker --publicUrl=/recommend"
  }
}
```



## License

MIT © [imagine10255](https://github.com/imagine10255)
