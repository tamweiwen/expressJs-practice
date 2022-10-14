const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); //passes to the next middleware -> in this case, to our customized middleware
    }
  };
};
module.exports = asyncWrapper;
