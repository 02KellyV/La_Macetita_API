var mongoose = require('mongoose');

//connect app to MongoDB with Mongoose
mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://Admin:Cifhi381@cluster0-r0ud3.mongodb.net/macetita?retryWrites=true&w=majority",
	{
		useNewUrlParser: true, 
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	});


//open our MongoDB connection
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to database'));