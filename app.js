const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const shopRouter = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const _404Routes = require("./controllers/404Controller")
const path = require("path");
app.set("view engine", "ejs");
// To Encode Body parameters From The Buffer and convert it to string
app.use(bodyParser.urlencoded({ extended: false }));
// To allow nodeJS Read Static Files From the given directory
// Static Files => css , js , bootstrap , imgs , ...
app.use(express.static(path.join(__dirname, "public")));
// only Routes start with admin will go in this router
app.use("/admin", adminRoutes);
// only Routes start with / will go in this router
app.use(shopRouter);

app.use(_404Routes._404_page_get);

const server = http.createServer(app);

server.listen(3000 , () => {
    console.log("http://localhost:3000/ is Running")
});
