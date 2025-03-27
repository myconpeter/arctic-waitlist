import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

let mongoUrl = '';
if (process.env.ENV === 'dev') {
	console.log('Running in Dev Mode');
	mongoUrl = process.env.MONGO_URI_DEV;
} else if (process.env.ENV === 'production') {
	console.log('Running in Production Mode');
	mongoUrl = process.env.MONGO_URI_PROD;
} else {
	console.log('Environment Not Set Properly');
	throw new Error('NO ENVIRONMENT');
}

const ConnectDB = async () => {
	try {
		await mongoose.connect(mongoUrl);
		console.log(`database connected to ${mongoUrl}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default ConnectDB;
