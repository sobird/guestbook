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
pm2 start pm2.config.js
```
