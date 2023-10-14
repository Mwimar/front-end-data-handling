const express = require("express");
const uuid = require("uuid"); //adds unique id to objects
const router = express.Router();

const { getRestaurants, storeRestaurants } = require("../util/restaurant-data"); //DESTRUCTURING OBJECTS

router.get("/restaurants", function (req, res) {
  //const storedRestaurants=resData.getRestaurants();//from require
  const storedRestaurants = getRestaurants();

  storedRestaurants.sort(function (resA, resB) {
    if (resA.name > resB.name) {
      return 1;
    }
    return -1;
  });
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const filePath = path.join(__dirname, "data", "restaurants.json");

  const storedRestaurants = getRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant }); //last restaurant refers to the function
    }
  }
  res.render("404");
});

router.post("/recommend", async function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4(); //adds a new id to retaurants entered
  const restaurants = getRestaurants();

  restaurants.push(restaurant);
  try {
    await storeRestaurants(restaurants);
  } catch (error) {
    console.error("Error:", error);
  }
  res.redirect("/confirm");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
