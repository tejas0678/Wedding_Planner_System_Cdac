function errorHandler(err, req, res, next) {
  console.error('[GATEWAY ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Gateway Error',
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  errorHandler
};
