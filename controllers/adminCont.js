const Product = require("../models/product");

const admin_addProduct_get = (req, res) => {
  res.render("admin/add-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
  });
};
const admin_addProduct_post = (req, res) => {
  const myProduct = new Product(req.body.title, req.body.price, req.body.desc);
  myProduct.save();
  res.render("admin/add-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
  });
};

const admin_products_get = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      path: "/admin/products",
      products: products,
    });
  });
};
const admin_editProducts_get = (req, res) => {
  Product.findById(req.params.productId , (product) => {
    res.render("admin/edit-product", { path: "/admin/edit-product"  , product : product});
  })
};
const admin_editProducts_post = (req,res) => {
  Product.findByIdAndUpdate(req.body.id , req.body.title , req.body.price , req.body.desc , () => {
    res.redirect("/admin/products")
  })
}
const admin_deleteProduct_delete = (req,res) => {
  Product.findByIdAndDelete(req.params.productId , () => {
      res.redirect("/admin/products")
  })
}
module.exports = {
  admin_addProduct_get,
  admin_addProduct_post,
  admin_products_get,
  admin_editProducts_get,
  admin_editProducts_post,
  admin_deleteProduct_delete,
};
