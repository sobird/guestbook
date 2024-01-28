This is a starter template for [Learn Next.js](https://nextjs.org/learn).


## pm2 
在服务器上全局安装PM2
```bash
npm i -g pm2
```

通过pm2命令行启动

```sh
# pm2 start yarn --name "nextjs" --interpreter bash -- start
pm2 start --name nextjs yarn -- start
pm2 show nextjs
```

通过pm2配置文件启动

```bash
PORT=4000 pm2 start pm2.config.js
```

## 部署Next.js

有两种方式

* 通过 `yarn build && yarn start` 命令行来启动SSR服务
* 构建独立的SSR服务，静态资源分开部署