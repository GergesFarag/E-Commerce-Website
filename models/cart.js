const fs = require("fs");
const path = require("path");
const FILE_PATH = path.join(__dirname, "../", "Data", "cart.json");
const getCart = (cb) => {
  fs.readFile(FILE_PATH, (err, fileContent) => {
    let myCart;
    if (!err) {
      myCart = JSON.parse(fileContent);
      cb(myCart);
    } else {
      console.log("NO Data Found In Cart");
      cb([]);
    }
  });
};
module.exports = class Cart {
  static addProduct(id, productPrice) {
    //Get Previous Cart Content
    fs.readFile(FILE_PATH, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //Check if product already exists or not & if exsits QTY + 1 else add in the products cart
      const existingProduct = cart.products.find((p) => p.id == id);
      const existingProductIndx = cart.products.findIndex((p) => p.id == id);
      let updatedProduct;
      if (existingProduct) {
        //if the product alreadt exists
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndx] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(FILE_PATH, JSON.stringify(cart), (err) => {
        console.log("Error While Writing in the cart ", err);
      });
    });
  }
  static fetchAll(cb) {
    getCart(cb);
  }
  static deleteProduct(id , productPrice , hasQty = false) {
    //Delete all products with same id ==> Will be fixed later;
    getCart((cart) => {
      const deleteProduct = cart.products.find((prod) => prod.id == id);
      if(deleteProduct){
        if(hasQty){
          const deleteProductIndx = cart.products.findIndex((prod) => prod.id == id);
          deleteProduct.qty--;
          cart.products[deleteProductIndx] = deleteProduct;
          cart.totalPrice -= +productPrice;
        }else{
          const restOfProducts = cart.products.filter((prod) => prod.id != id);
          cart.products = restOfProducts;
          cart.totalPrice -= +(productPrice * deleteProduct.qty);
        }
        fs.writeFile(FILE_PATH, JSON.stringify(cart), (err) => {
          if (err) {
            console.log("Error While Deleting From Cart");
          }
        });
      }else{
        fs.writeFile(FILE_PATH, JSON.stringify(cart), (err) => {
          if (err) {
            console.log("Error While Deleting From Cart when product not found");
          }
        });
      }
    });
  }
};
