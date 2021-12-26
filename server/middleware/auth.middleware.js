const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send({ user: null });
  }
};
module.exports = checkAuthenticated;

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
};
module.exports = checkNotAuthenticated;
