const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const UI_API_ENDPOINT =
  process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };

const apiProxyTarget = process.env.API_PROXY_TARGET || 'http://localhost:3000';

apiProxyTarget &&
  app.use(
    '/graphql',
    createProxyMiddleware({ target: apiProxyTarget, changeOrigin: true })
  );

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server start on Port ${port}`);
});
