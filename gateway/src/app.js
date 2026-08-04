const express = require('express');
const cors = require('cors');
const { verifyJwtToken } = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');
const routes = require('./routes');

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(verifyJwtToken);

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP', gateway: 'Wedding Planner API Gateway', timestamp: new Date() });
});

app.use('/', routes);

app.use(errorHandler);

module.exports = app;
