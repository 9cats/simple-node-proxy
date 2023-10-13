const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000; // 你可以选择其他的端口号

app.use('/', async (req, res) => {
  const targetUrl = req.originalUrl.slice(1); // 移除前面的斜线 /

  if (!targetUrl.startsWith('http')) {
    return res.status(400).send('Invalid URL');
  }

  try {
    const response = await fetch(targetUrl);
    const body = await response.buffer();

    // 设置从原始响应中获取的所有头部
    for (const [key, value] of Object.entries(response.headers.raw())) {
      res.setHeader(key, value);
    }

    return res.status(response.status).send(body);
  } catch (err) {
    return res.status(500).send('Error occurred');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});