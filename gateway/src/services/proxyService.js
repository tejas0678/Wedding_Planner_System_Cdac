const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config');

const springProxy = createProxyMiddleware({
  target: config.springBackendUrl,
  changeOrigin: true,
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error('[GATEWAY PROXY ERROR -> SPRING BOOT]:', err.message);
    res.status(502).json({
      success: false,
      message: 'Spring Boot Backend Unavailable (Port 8081)'
    });
  }
});

const dotnetProxy = createProxyMiddleware({
  target: config.dotnetBackendUrl,
  changeOrigin: true,
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error('[GATEWAY PROXY ERROR -> ASP.NET CORE]:', err.message);
    res.status(502).json({
      success: false,
      message: 'ASP.NET Core Backend Unavailable (Port 5000)'
    });
  }
});

const chatbotProxy = createProxyMiddleware({
  target: config.chatbotBackendUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/chat': '' // remove /chat prefix when routing to chatbot service
  },
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error('[GATEWAY PROXY ERROR -> CHATBOT SERVICE]:', err.message);
    res.status(502).json({
      success: false,
      message: 'Chatbot Service Unavailable (Port 8083)'
    });
  }
});

module.exports = {
  springProxy,
  dotnetProxy,
  chatbotProxy
};
