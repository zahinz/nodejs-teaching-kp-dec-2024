function logger(req, res, next) {
  // log the request method, status code and the request URL
  console.log(`${req.method} ${req.url}`);
  next();
}

const middlewares = {
  logger,
};

export default middlewares;
