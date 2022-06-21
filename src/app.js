const express = require("express");
const path = require("path")
const app = express();
const hbs = require("hbs");
const dotenv = require("dotenv");

dotenv.config({path:'./config.env'});
require("./db/conn");

const Registers = require("./models/registers")

const port = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);

app.use(require("../routers/auth"));

app.get("/",(req,res) => {
    res.render("index");
});

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});