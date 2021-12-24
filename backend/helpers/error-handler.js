function errorHandler(err, req, res, next) {
  console.log(JSON.parse(JSON.stringify(err)));
  switch (err) {
    case 'UnauthorizedError':
      res.status(401).json({
        message: 'The user is not authorized.',
      });
    case 'Invalid User':
      res.status(401).json({
        message: 'Invalid Credentials',
      });
    default:
      res.status(500).json(err);
  }
  return;
}

module.exports = errorHandler;
