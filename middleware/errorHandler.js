const {CustomError} = require('../errors');
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.error(err);
  res.status(500).json({ msg: 'Internal Server Error' });
};

module.exports = errorHandler;
