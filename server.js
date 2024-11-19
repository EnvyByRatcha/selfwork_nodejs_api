const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const UserController = require("./controller/userController");
const CustomerController = require("./controller/customerController");
const SparePartController = require("./controller/sparePartController");

//-----USER-----//
app.post("/api/user/signIn", (req, res) => UserController.signIn(req, res));
app.delete("/api/user/remove/:id", (req, res) =>
  UserController.remove(req, res)
);
app.post("/api/user/create", (req, res) => UserController.create(req, res));
app.put("/api/user/update", (req, res) => UserController.update(req, res));
app.get("/api/user/list/:role", (req, res) => UserController.list(req, res));

//-----CUSTOMER-----//
app.post("/api/customer/create", (req, res) =>
  CustomerController.create(req, res)
);
app.get("/api/customer/list", (req, res) => CustomerController.list(req, res));
app.delete("/api/customer/remove/:id", (req, res) =>
  CustomerController.remove(req, res)
);
app.put("/api/customer/update", (req, res) =>
  CustomerController.update(req, res)
);

app.listen(3001, () => {
  console.log("server start !!");
});
