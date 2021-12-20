function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err.name) {
    case 'UnauthorizedError':
      res.status(401).json({
        message: 'The user is not authorized.',
      });
    default:
      res.status(500).json(err);
  }
  return;
}

module.exports = errorHandler;
