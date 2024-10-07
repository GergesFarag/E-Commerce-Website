const express = require("express");
const shopRouter = express.Router();
const shopControllers = require("../controllers/shopCont")

shopRouter.get("/index", shopControllers.shop_index_get)
shopRouter.get("/", shopControllers.shop_index_get)

shopRouter.get("/products-list" , shopControllers.shop_productList_get)

shopRouter.get("/cart" , shopControllers.shop_cart_get)

shopRouter.get("/checkout" , shopControllers.shop_checkout_get)

shopRouter.get("/products/:product_id" , shopControllers.shop_productById_get)

shopRouter.post("/cart" , shopControllers.shop_cart_post);

shopRouter.post("/cart/deleteProduct/:productId" , shopControllers.shop_cart_delete);

module.exports = shopRouter;
