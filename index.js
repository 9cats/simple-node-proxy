const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000; // 你可以选择其他的端口号

app.use('/', async (req, res) => {
  const targetUrl = req.originalUrl.slice(1);

  if (!targetUrl.startsWith('http')) {
    return res.status(400).send('Invalid URL');
  }

  try {
    const response = await fetch(targetUrl);

    // 设置从原始响应中获取的所有头部
    for (const [key, value] of Object.entries(response.headers.raw())) {
      res.setHeader(key, value);
    }

    // 使用流式传输
    response.body.pipe(res).on('error', err => {
      console.error('Stream error:', err);
      res.status(500).end();
    });
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).send('Error occurred');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});