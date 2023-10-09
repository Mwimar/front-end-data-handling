const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));//setting path for viewing templates;
app.set('view engine', 'ejs');//viewing files as templates with ejs engine package
app.use(express.static('public'));//making files available;

app.use(express.urlencoded({ extended: false }));

app.get('/index', function (req, res) {
    res.render('index')
})


app.get('/restaurants', function (req, res) {
    res.render('restaurants');
});

app.post('/recommend', function (req, res) {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    res.redirect('/confirm');
})


app.get('/recommend', function (req, res) {
    res.render('recommend');
});


app.get('/confirm', function (req, res) {
    res.render('/confirm')
})

app.get('/about', function (req, res) {
    res.render('about'); //alternative for sendFile Method
})

// app.get('/about', function (req, res) {
//     const htmlFilePath = path.join(__dirname, 'views', 'about.html');
//     res.sendFile(htmlFilePath);
// })



app.listen(3000);
