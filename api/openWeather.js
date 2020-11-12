const fetch = require('node-fetch');
const withQuery = require('with-query').default;

//Configure OpenWeather API 

const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';


module.exports = async (city,appid_weather) => {

    const url = withQuery(ENDPOINT, {
        q: city,
        appid: appid_weather
    });

    const data = await fetch(url);
    const jsonData = await data.json();

    return jsonData

}