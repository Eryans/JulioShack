const addUserIdToRequest = (req, res, next) => {
  try {
    req.userId = req.params.user;
    next();
  } catch (error) {
    console.log(error)
  }
};

module.exports = { addUserIdToRequest };
