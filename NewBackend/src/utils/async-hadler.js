const asyncHandler = (requestHandler) => {
  return (req, res, next) => {   // ✅ sahi order
    Promise
      .resolve(requestHandler(req, res, next))
      .catch((err) => next(err));
  };
};

export { asyncHandler };
