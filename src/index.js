import qrImage from 'qr-image';

// 处理 CORS 的头信息
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env, ctx) {
    try {
      // 处理 OPTIONS 请求
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: corsHeaders,
        });
      }

      // 解析请求体的 JSON 数据
      const requestBody = await request.json();

      // 从请求体中提取参数
      const { info, size } = requestBody;

      // 获取 QR 码的默认尺寸
      const defaultSize = 200;

      // 获取最终尺寸，如果用户提供了 size 参数则使用用户的尺寸，否则使用默认尺寸
      const qrSize = size ? parseInt(size) : defaultSize;

      // 使用 Promise 将 QR 码生成异步化
      const generateQRCode = () =>
        new Promise((resolve, reject) => {
          const qrStream = qrImage.image(info, { size: qrSize, type: 'svg' }); // 设置 type 为 'svg'
          const chunks = [];

          qrStream
            .on('data', (chunk) => chunks.push(chunk))
            .on('end', () => resolve(Buffer.concat(chunks)))
            .on('error', (error) => reject(error));
        });

      // 生成 QR 码的 buffer
      const qrBuffer = await generateQRCode();

      // 构建最终图片
      const image = {
        qrCode: qrBuffer.toString('utf-8'), // 将 buffer 转换为字符串
      };

      // 返回 SVG 数据
      return new Response(image.qrCode, {
        headers: {
          'Content-Type': 'image/svg+xml', // 设置 Content-Type 为 'image/svg+xml'
          ...corsHeaders,
        },
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      return new Response('Internal Server Error', {
        headers: corsHeaders,
        status: 500,
      });
    }
  },
};
