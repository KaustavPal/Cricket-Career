const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const playerRoutes = require("./routes/players");
const sequelize = require("./utils/database");

const Player = require("./models/player");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ urlencoded: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/cricketcareer", playerRoutes);

sequelize
  .sync({ force: false })
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
