//Load required libraries
const express = require('express');
const handlebars = require('express-handlebars');
const openWeather = require('./api/openWeather');
const news = require('./api/newsApi');


//Configure port 
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;
const weatherAPI_KEY = process.env.WEATHER_API_KEY;
const newsAPI_KEY = process.env.NEWS_API_KEY;  



// Initiate an instance of express and set engine

const app = express();
app.engine('hbs',handlebars({defaultLayout: 'default.hbs'}));
app.set('view engine', 'hbs');


//Configure routes
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {

    res.status(200);
    res.type('text/html');
    res.render('home');
    
})

app.get('/search', async (req,res) => { 

    const city = req.query.city;

    //Query openWeather API
    const weatherJsonData = await openWeather(city,weatherAPI_KEY);
    const {temp,feels_like} = weatherJsonData.main;
    const temp_celsius = (temp - 273.15).toFixed(1);
    const feels_like_celsius = (feels_like - 273.15).toFixed(1);

    //Query news API
    const newsJsonData = await news(city,newsAPI_KEY);
    console.info(newsJsonData) 

    res.status(200);
    res.format({
        'text/html': () => {res.render('resultsPage', {temp_celsius,feels_like_celsius})}
    })


})



// Start app
!weatherAPI_KEY ? console.info("Please set your OpenWeather API_KEY with 'set WEATHER_API_KEY={your key}'.") :
!newsAPI_KEY ? console.info("Please set your News API_KEY with 'set NEWS_API_KEY={your key}'.") :
app.listen(PORT, () => {console.log(`Your app has started on port ${PORT} at ${new Date()}`)})