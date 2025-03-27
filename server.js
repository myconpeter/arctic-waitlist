import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import flash from 'connect-flash';
import passport from 'passport';
import session from 'express-session';
import { fileURLToPath } from 'url'; // ✅ Required for ES Modules

import ConnectDB from './config/database.js';
import joinRoute from './routes/join.js';

// Manually Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// PASSPORT CONFIGURATION
app.use(
	session({
		secret: 'mycon',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());
// req flash
app.use(flash());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(joinRoute);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
	ConnectDB();
	console.log(`Server is running on port ${PORT}`);
});
