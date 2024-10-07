const fs = require("fs");
const path = require("path");
const FILE_PATH = path.join(__dirname, "../", "Data", "products.json");
const Cart = require("./cart")
const getProductsFromFile = function (cb){
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

class Product {
  constructor(title, price, desc) {
    this.title = title;
    this.price = price;
    this.desc = desc;
  }
  save() {
    getProductsFromFile((prods) => {
      this.id = prods.length > 0 ? prods[prods.length - 1].id + 1 : 1;
      prods.push(this);
      fs.writeFile(FILE_PATH, JSON.stringify(prods), (err) => {
        if (err) {
          console.log("Error While Writting", err);
        }
      });
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id , cb) {
    getProductsFromFile(products => {
      const myProduct = products.filter(prod => prod.id == id);
      return cb({...myProduct[0]})
    })
  }
  static findByIdAndUpdate(id , title , price , desc , cb) {
    getProductsFromFile(products => {
      let myProduct = products.find((ele) => ele.id == id)
      let myProductIndex = products.findIndex((ele) => ele.id == id)
      Object.assign(myProduct , {title , price , desc});
      products.splice(myProductIndex , 1 , myProduct);
      fs.writeFile(FILE_PATH , JSON.stringify(products) , err => {
        if(err){
          console.log("There is error when updating the products" , err);
        }
      })
      cb(products)
    })
  }
  static findByIdAndDelete(id , cb){
    getProductsFromFile(products => {
      const newProducts = products.filter(product => product.id != id);
      const myDeletedProduct = products.find(product => product.id == id);
      console.log(myDeletedProduct);
      Cart.deleteProduct(myDeletedProduct.id , myDeletedProduct.price);
      fs.writeFile(FILE_PATH , JSON.stringify(newProducts) , err => {
        console.log(err)
      })
      cb(newProducts)
    })
  } 
}
module.exports = Product;
