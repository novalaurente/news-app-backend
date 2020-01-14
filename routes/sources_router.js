const express = require('express');
const Source = require('../models/Source');
const SourcesRouter = express.Router();

SourcesRouter.get('/', async (req, res)=> {
  try {
    const sources = await Source.find()

    res.send(sources);
  } catch (e) {
    console.log(e)
  }
})

module.exports = SourcesRouter;