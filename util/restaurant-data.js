const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');// '..' goes to higher directory

function getRestaurants() {

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
};

function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants))
};

 module.exports = {
  getRestaurants,
 storeRestaurants
};// to state areas in this file that should be exposed to other files
// the right side is the key that refers to the called function

// module.exports = getRestaurants;
// module.exports = storeRestaurants;