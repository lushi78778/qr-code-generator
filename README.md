# qr-code-generator

这是二维码生成 api 的 cloudflare workers 部署

同时也是解决 CORS 的样板文件

## 关于CORS

- CORS，全称Cross-Origin Resource Sharing [1] ，是一种允许当前域（domain）的资源（比如html/js/web service）被其他域（domain）的脚本请求访问的机制，通常由于同域安全策略（the same-origin security policy）浏览器会禁止这种跨域请求。


## 部署方式（wrangler）

```bash
# 安装 wrangler
npm install wrangler --save-dev

# 需要使用 Wrangler 开发
npx wrangler dev

# 要启动本地服务器来开发 Pages 应用程序，请运行：
npx wrangler pages dev

# 部署应用程序
npx wrangler deploy

# 查看 Wrangler 命令的列表以及每个命令的说明
npx wrangler --help

# 参考：https://developers.cloudflare.com/workers/wrangler/commands/
```
