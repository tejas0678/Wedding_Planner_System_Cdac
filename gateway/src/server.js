const app = require('./app');
const config = require('./config');

const PORT = config.port; // 8080
const FALLBACK_PORT = config.fallbackPort; // 8082

const server8082 = app.listen(FALLBACK_PORT, () => {
  console.log(`>>> [API GATEWAY] Running on Port ${FALLBACK_PORT}`);
});

server8082.on('error', (err) => {
  console.warn(`Port ${FALLBACK_PORT} unavailable: ${err.message}`);
});

const server8080 = app.listen(PORT, () => {
  console.log(`>>> [API GATEWAY ALIAS] Listening on Port ${PORT}`);
});

server8080.on('error', (err) => {
  console.warn(`>>> [API GATEWAY INFO] Port ${PORT} busy (${err.message}). System routing active via Port ${FALLBACK_PORT}.`);
});
