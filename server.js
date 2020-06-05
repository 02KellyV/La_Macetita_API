require('./config/database.js');
require('dotenv').config();
const harvestApiRouter = require('./routes/api/harvests'),
harvestRouter = require('./routes/views/harvests'),
express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
path = require('path'),
port = 3000,

// init app 
app = express();

app.use(express.json());

// middleware
//send req as json, express can read
app.use(bodyParser.json());
// for data type app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


//static files, path join concat dir and where run the process
app.use("/static", express.static(path.join(__dirname, "public")));

//routes
app.use('/api/harvests', harvestApiRouter);

app.use('/harvests', harvestRouter);

//Example: 
//app.get('/', (req, res) => res.send('Hello World!'));

//redirect
app.get('/', function(req, res){
	res.redirect('/harvests');
});

// For set: 
//app.listen(port, () => console.log(`Started listening at http://localhost:${port}`));
const server = app.listen(8000, function(){
	console.log(`Started listening at http://localhost:${server.address().port}`);
});

// Exports app instance
module.exports = app