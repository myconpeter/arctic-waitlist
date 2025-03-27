import express from 'express';
const router = express.Router();
import WaitList from '../model/waitlist.js';
import dotenv from 'dotenv';

dotenv.config();

router.get('/admin', async (req, res) => {
	res.render('adminLogin');
});
router.post('/admin', (req, res, next) => {
	const { pin } = req.body;

	if (pin !== process.env.ADMIN_PIN) {
		req.flash('error_msg', 'Incorrect Admin Pin');
		return res.redirect('/admin');
	}
	return res.redirect('/all-waitlist');
});

router.get('/all-waitlist', async (req, res) => {
	try {
		const allUsers = await WaitList.find();
		const totalUsers = await WaitList.countDocuments(); // Get total count of users

		res.render('allwaitlist', { waitlist: allUsers, totalUsers });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});


router.get('/', async (req, res) => {
	res.render('index');
});

// router.get('/bear', async (req, res) => {
// 	res.render('waitlisted');
// });

router.post('/save-waitlist', async (req, res) => {
	const { name, email } = req.body;
	const errors = [];

	if (!name || !email) {
		errors.push({ msg: 'Please fill in all fields' });
	}

	if (errors.length > 0) {
		return res.render('index', {
			errors,
			...req.body,
		});
	}

	const alreadyWaitlisted = await WaitList.findOne({ email });
	if (alreadyWaitlisted) {
		req.flash('error_msg', 'You are already on the Waitlist');
		return res.redirect('/');
	}

	const newWaitList = new WaitList({
		...req.body,
	});

	await newWaitList.save();
	return res.render('waitlisted');
});

export default router;
