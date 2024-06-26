require('dotenv').config();
const path = require('path');
const express = require('express');
const db = require('./config/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const setMiddlewares = require('./middleware/middleware');
const setRoutes = require('./route/route');

const app = express();
app.use(cors());

app.set('view engine', 'ejs');
app.set('views');
app.use(express.static('public'));

app.use(cookieParser());

setMiddlewares(app);
setRoutes(app);

app.use(
	session({
		secret: 'admin_login_secret',
		resave: false,
		saveUninitialized: false,
	})
);

db.connect(function (err) {
	if (err) {
		return console.error('error: ' + err.message);
	}
	console.log('Connected to the MySQL server.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log('Server created success', PORT);
});
