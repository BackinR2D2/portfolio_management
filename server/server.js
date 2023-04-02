require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');

app.use(morgan('dev'));
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);
app.use(
	cors({
		origin: ['http://localhost:3000'],
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API Routes
const portfolioRoutes = require('./routes/portfolio.route');

app.use('/api', portfolioRoutes);
app.use('/api/images', express.static('./uploads/'));

app.listen(PORT, () => {
	if (!fs.existsSync('./uploads/')) {
		fs.mkdirSync('./uploads/');
	}
	console.log(`Listening on port ${PORT}`);
});

module.exports = app;
