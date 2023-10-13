const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const app = express();

app.set('views', path.join(__dirname, 'views'));//setting path for viewing templates;
app.set('view engine', 'ejs');//viewing files as templates with ejs engine package
app.use(express.static('public'));//making files available;

app.use(express.urlencoded({ extended: false }));

app.get('/index', function (req, res) {
    res.render('index')
})


app.get('/restaurants', function (req, res) {
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
    });
});

app.get('/restaurants/:id', function (req, res) {
    const restaurantId = req.params.id;

    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId){
             return res.render('restaurant-detail', { restaurant:restaurant });//last restaurant refers to the function
           
        }
    }

});

app.post('/recommend', async function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4(); //adds a new id to retaurants entered
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);
    try {
        await fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    
    } catch (error) {
        console.error('Error:', error);
    }
    res.redirect('/confirm');
    })


app.get('/recommend', function (req, res) {
    res.render('recommend');
});


app.get('/confirm', function (req, res) {
    res.render('confirm')
})

app.get('/about', function (req, res) {
    res.render('about'); //alternative for sendFile Method
})

// app.get('/about', function (req, res) {
//     const htmlFilePath = path.join(__dirname, 'views', 'about.html');
//     res.sendFile(htmlFilePath);
// })



app.listen(3000);
