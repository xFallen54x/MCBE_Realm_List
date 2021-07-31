// Variables
const Express = require("express"),
  bodyParser = require("body-parser"),
  main = require("./routes/main"),
  auth = require("./routes/discord/auth"),
  realms = require("./routes/realms"),
  dashboard = require("./routes/dashboard"),
  xbox = require("./routes/xbox"),
  xboxsync = require("./server/xboxsync"),
  passport = require("passport"),
  session = require("express-session"),
  Strategy = require("passport-discord").Strategy,
  MemoryStore = require("memorystore")(session),
  app = Express(),
  PORT = process.env.PORT || 3000,
  mongoose = require("mongoose");

passport.use(
  new Strategy(
    {
      clientID: "820316303641411594",
      clientSecret: "1Ljp_wXDwb5T8f8-t1AMfB69QhTXOSpg",
      callbackURL: `http://localhost:3000/auth/callback`,
      scope: ["identify", "guilds"],
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }
  )
);

app.use(
  session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret:
      "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.locals.domain = "localhost:3000";
app.use("/public", Express.static("public"));
app.use("/images", Express.static("public/images"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Handle routes
app.use("/", main);
app.use("/xbox", xbox);
app.use("/auth", auth);
app.use("/realms", realms);
app.use("/dashboard", dashboard);

// Start Server
mongoose
  .connect("mongodb+srv://User:lGSC1ajAUiGM1qtv@cluster0.ehok5.mongodb.net/MCBE?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, reconnectTries: 5 })
  .then(() => {
    app.listen(PORT, () => {
      console.log("listenning on " + PORT);
    });
  })
  .catch((dbErr) => {
    console.log("DB Connection Error: ", dbErr.message);
    process.exit(1);
  });