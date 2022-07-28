// Owen's API key : 2aa0e1c86bb8458db6fd004f3f1367cc

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('2aa0e1c86bb8458db6fd004f3f1367cc');

// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  q: 'charity events',
  category: 'general',
  language: 'en',
  country: 'sg'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});