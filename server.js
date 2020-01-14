const express = require('express');
const NewsRouter = require("./routes/news_router");
const SourcesRouter = require("./routes/sources_router");
const SyncRouter = require("./routes/sync_router");
const app = express();
const cors = require("cors");

const PORT = 4000;

require('./database');

// middlewares
app.use(express.json());
app.use(cors());
app.use('/sources', SourcesRouter);
app.use('/news', NewsRouter);
app.use('/sync', SyncRouter)

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})
