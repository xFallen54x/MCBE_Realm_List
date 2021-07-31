// Variables
const Express = require("express"),
  router = Express.Router();

const renderTemplate = (res, req, template, data = {}) => {
  const baseData = {
    user: req.isAuthenticated() ? req.user : null,
  };

  res.render(
    template,
    Object.assign(baseData, data)
  );
};

router.get("/", (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/login')
    } else {
  renderTemplate(res, req, 'dashboard')
    }
});

module.exports = router;
