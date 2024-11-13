const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const UserController = require("./controller/userController");
const WorkSheetController = require("./controller/workSheetController");
const SparePartController = require("./controller/sparePartController");

app.post("/api/user/signIn", (req, res) => UserController.signIn(req, res));
app.delete("/api/user/remove/:id", (req, res) =>
  UserController.remove(req, res)
);

app.listen(3001, () => {
  console.log("server start !!");
});
