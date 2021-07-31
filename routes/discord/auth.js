// Variables
const Express = require("express"),
  passport = require("passport"),
  router = Express.Router(),
  url = require("url"),
  path = require("path");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  req.session.backURL = req.url;

  res.redirect("/login");
};

router.get(
  "/login",
  (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === "localhost:3000") {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }

    next();
  },
  passport.authenticate("discord")
);

router.get(
  "/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => {
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  }
);

router.get("/logout", function (req, res) {
  req.session.destroy(() => {
    req.logout();
    // We redirect user to index.
    res.redirect("/");
  });
});

module.exports = router;
