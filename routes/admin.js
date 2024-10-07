const express = require("express");
const adminRouter = express.Router();
const adminControllers = require("../controllers/adminCont")
// When using .use => the first part matched url will be redirected first
adminRouter.get("/add-product", adminControllers.admin_addProduct_get);
// When filtering by method the redirected url will be fully matched
adminRouter.post("/add-product", adminControllers.admin_addProduct_post)

adminRouter.get("/products" , adminControllers.admin_products_get)

adminRouter.get("/edit-product/:productId"  , adminControllers.admin_editProducts_get)

adminRouter.post("/edit-product" , adminControllers.admin_editProducts_post)

adminRouter.post("/delete-product/:productId" , adminControllers.admin_deleteProduct_delete)

module.exports = adminRouter;
