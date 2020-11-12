const fetch = require('node-fetch');
const withQuery = require('with-query').default;

//Configure News API 

const ENDPOINT = 'https://newsapi.org/v2/top-headlines?';


module.exports = async (city,appid_news) => {

    const url = withQuery(ENDPOINT, {
        q: city
    });

    const data = await fetch(url, { headers: { Authorization: appid_news }});
    const jsonData = await data.json();

    return jsonData

}