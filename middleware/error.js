const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  res.status(error.status).json({ msg: error.message });
};
// const errorHandlerMiddleware = (error, req, res, next) => {
//   console.log(error);
//   res.status(500).json({ msg: error });
// };

module.exports = errorHandlerMiddleware;
