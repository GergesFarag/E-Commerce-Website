const Product = require("../models/product");
const Cart = require("../models/cart");

const shop_productList_get = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/products-list", {
      products: products,
      path: "/products-list",
    });
  });
};

const shop_index_get = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { products: products, path: "/index" });
  });
};

const shop_cart_get = (req, res) => {
  Cart.fetchAll(async (cart) => {
    if (cart.length != 0) {
      const myTotalPrice = cart.totalPrice;
      const productPromises = cart.products.map((product) => {
        return new Promise((resolve) => {
          Product.findById(+product.id, (prod) => {
            prod.qty = product.qty;
            resolve(prod);
          });
        });
      });
      const myCurrentCart = await Promise.all(productPromises);
      return res.render("shop/cart", {
        path: "/cart",
        products: myCurrentCart,
        totalPrice: myTotalPrice,
      });
    } else {
      return res.render("shop/cart", {
        path: "/cart",
        products: [],
        totalPrice: 0,
      });
    }
  });
};

const shop_cart_post = (req, res) => {
  Product.findById(req.body.productId, (product) => {
    Cart.addProduct(req.body.productId, product.price);
    res.redirect("/cart");
  });
};

const shop_cart_delete = (req, res) => {
  const directDelete = req.query.direct; //indicate that the pressed button is direct delete not decreasing the quantity
  console.log(directDelete);
  Product.findById(req.params.productId, (product) => {
    Cart.fetchAll((cart) => {
      const myProduct = cart.products.find(
        (prod) => prod.id == req.params.productId
      );
      myProduct.qty > 1 && !directDelete
        ? Cart.deleteProduct(req.params.productId, product.price, true)
        : Cart.deleteProduct(req.params.productId, product.price);
    });
    res.redirect("/cart");
  });
};

const shop_checkout_get = (req, res) => {
  res.render("shop/checkout", { path: "/checkout" });
};

const shop_productById_get = (req, res) => {
  const myProdID = req.params.product_id;
  Product.findById(myProdID, (product) => {
    res.render("shop/product-details", {
      product: product,
      path: "/products-list",
    });
  });
};

module.exports = {
  shop_productList_get,
  shop_index_get,
  shop_cart_get,
  shop_checkout_get,
  shop_productById_get,
  shop_cart_post,
  shop_cart_delete,
};
