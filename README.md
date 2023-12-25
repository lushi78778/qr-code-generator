# qr-code-generator

这是二维码生成 api 的 cloudflare workers 部署

同时也是解决 CORS 的样板文件

## 关于 CORS 了解原理

- CORS，全称Cross-Origin Resource Sharing [1] ，是一种允许当前域（domain）的资源（比如html/js/web service）被其他域（domain）的脚本请求访问的机制，通常由于同域安全策略（the same-origin security policy）浏览器会禁止这种跨域请求。

- 浏览器会禁止这种跨域请求

- 预检请求（Preflighted Request）：浏览器发出 PUT 请求， OPTION 请求返回Access-Control-Allow-Origin:*,Access-Control-Allow-Methods:’PUT’，服务器同意所有域的PUT请求，浏览器收到并继续发出真正的PUT请求，服务器响应并再次返回Access-Control-Allow-Origin:*,允许浏览器的脚本执行服务器返回的数据。

- 解决：通过处理 OPTIONS 请求解决

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

## 接口信息-二维码生成

> v1.0.0

Base URLs:

* <a href="https://api-cf.ewlgc.top">正式环境: https://api-cf.ewlgc.top</a>


POST /gen-qrcode

此 API 提供了生成 QR 码的服务，用户可以通过发送 HTTP 请求获取包含特定信息的 QR 码的 SVG 数据。

> Body Parameters

```json
{
  "info": "https://ewlgc.top",
  "size": "50"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» info|body|string| yes |QR 码的内容|
|» size|body|integer(int32)| no |生成的 QR 码的尺寸。用户可以提供一个自定义的尺寸值，该值将被解析为整数，并用作生成二维码的尺寸。如果用户未提供 size 参数，将使用默认尺寸为 200x200 像素。|

> Response Examples

> 200 Response

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|



