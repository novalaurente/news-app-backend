const express = require('express');
const News = require('../models/News');
const NewsRouter = express.Router();

NewsRouter.get('/', async (req, res)=> {
  try {
    const news = await News.find({sourceId: req.query.source})

    res.send(news);
  } catch (e) {
    console.log(error)
  }
})

module.exports = NewsRouter;