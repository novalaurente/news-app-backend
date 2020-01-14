const mongoose = require("mongoose");

const databaseUrl = process.env.DATABASE_URL || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(databaseUrl, {
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(()=>{
	console.log("Remote Database Connection Established")
});

