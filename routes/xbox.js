const Express = require("express"),
  FormData = require('form-data'),
  fetch = require('node-fetch'),
  router = Express.Router(),
  xbox = require('xbox-api');

const renderTemplate = (res, req, template, data = {}) => {
  const baseData = {
    user: req.isAuthenticated() ? req.user : null,
  };

  res.render(
    template,
    Object.assign(baseData, data)
  );
};

var config = {
  "client_id": "2295a725-0097-47eb-ba1d-c79dca4606e1",
  "redirect_uri": "http://localhost:3000/xbox/auth/callback",
  "client_secret": "p53ug8UU5UygCCB-pST.Ut-_42EREmZ2zg"
}

router.get("/auth", (req, res) => {
  res.redirect(xbox.makeauthurl(config))
});

router.get("/auth/callback", async (req, res) => {
  try {
    console.log(xbox.gettoken(req.query.code, config))
    res.redirect('http://localhost:3000')
  } catch (error) {
    res.redirect(403, 'http://localhost:3000')
    console.log(error)
  }
});

module.exports = router;
