const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const UserController = require("./controller/userController");
const CustomerController = require("./controller/customerController");
const ProductController = require("./controller/productController");
const SparePartController = require("./controller/sparePartController");
const AssignmentController = require("./controller/assignmentController");

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

//-----PRODUCT-----//
app.get("/api/category/list", (req, res) =>
  ProductController.listCategory(req, res)
);
app.post("/api/product/create", (req, res) =>
  ProductController.createProduct(req, res)
);
app.get("/api/product/list/:id", (req, res) =>
  ProductController.listProduct(req, res)
);
app.put("/api/product/update", (req, res) =>
  ProductController.updateProduct(req, res)
);
app.delete("/api/product/remove/:id", (req, res) =>
  ProductController.removeProduct(req, res)
);
app.post("/api/productDetail/create/:product", (req, res) =>
  ProductController.createProductDetail(req, res)
);
app.get("/api/productDetail/list/:product", (req, res) =>
  ProductController.listProductDetail(req, res)
);
app.delete("/api/productDetail/remove/:id", (req, res) =>
  ProductController.removeProductDetail(req, res)
);
app.put("/api/productDetail/update", (req, res) =>
  ProductController.updateProductDetail(req, res)
);
app.get("/api/productdetail/search/:product/:serialNumber", (req, res) =>
  ProductController.searchProductDetail(req, res)
);

//-----SPAREPART-----//
app.post("/api/sparepart/create", (req, res) =>
  SparePartController.create(req, res)
);
app.put("/api/sparepart/edit/:id", (req, res) =>
  SparePartController.edit(req, res)
);
app.get("/api/sparepart/list", (req, res) =>
  SparePartController.list(req, res)
);
app.delete("/api/sparepart/remove/:id", (req, res) =>
  SparePartController.remove(req, res)
);

app.listen(3001, () => {
  console.log("server start !!");
});
