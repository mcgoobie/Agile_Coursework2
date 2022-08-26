// Owen's API key : 2aa0e1c86bb8458db6fd004f3f1367cc

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('2aa0e1c86bb8458db6fd004f3f1367cc');

newsapi.v2.topHeadlines({
  q: '',
  category: 'business',
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