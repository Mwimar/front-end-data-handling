const path = require("path");

const express = require("express");

//const resData = require('./util/restaurant-data');//to access stated functions

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

app.set("views", path.join(__dirname, "views")); //setting path for viewing templates;
app.set("view engine", "ejs"); //viewing files as templates with ejs engine package
app.use(express.static("public")); //making files available;

app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);

app.use("/", restaurantRoutes);

// app.get('/about', function (req, res) {
//     const htmlFilePath = path.join(__dirname, 'views', 'about.html');
//     res.sendFile(htmlFilePath);
// })

app.use(function (req, res) {
  res.status(404).render("404"); //addding a method to a method is called chaining;
}); //handles errors in unavailable routes

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
