const express = require('express');
const NewsAPI = require('newsapi');
const Source = require('../models/Source');
const News = require('../models/News');

const newsapi = new NewsAPI(process.env.NEWS_API_ORG_API_KEY);

const SyncRouter = express.Router();

const fetchNews = (source, pageNum, pageSize) => {
  return newsapi.v2.everything({
    sources: source,
    language: 'en',
    page: pageNum,
    pageSize: pageSize,
  })
}

const fetchSources = () => {
  return newsapi.v2.sources({
    // The category is fixed so we will not get so many data from sources.
    category: 'technology',
    language: 'en',
    country: 'us'
  })
}

SyncRouter.post('/', async (req, res)=> {

  try {
    // query all the potential sources.
    const sourceResponse = await fetchSources();
    const sources = sourceResponse.sources;

    // once the sources are fetched, traverse the response and check the existence of the source in the database
    sources.forEach(async (source) => {
      const sourceExists = await Source.exists({id: source.id});

      if (!sourceExists) {
        // If the source does not exist in the database via source id, save the source in the database.e
        await Source.create({
          id: source.id,
          name: source.name,
          description: source.description,
          url: source.url,
          category: source.category,
          language: source.language,
          country: source.country
        });
      }
    })

    // query news api org
    const sourceIds = sources.map((source) => {
      return source.id
    })

    const newsResponse = await fetchNews(sourceIds.join(','), 1, 100)

    // once the news are fetched, traverse the response and check the existence of the article in the database
    newsResponse.articles.forEach(async (article) => {
      const newsArticleExists = await News.exists({url: article.url});

      if (!newsArticleExists) {
        // If the news article does not exist in the database via news article URL, save the news article in the database
        await News.create({
          sourceId: article.source.id,
          sourceName: article.source.name,
          author: article.author,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content
        });
      }
    })
    res.send('ok');
  } catch (e) {
    console.log(e)
  }
})

module.exports = SyncRouter;