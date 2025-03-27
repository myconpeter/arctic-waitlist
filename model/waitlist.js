import mongoose from 'mongoose';

const WaitListSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const WaitList = mongoose.model('WaitList', WaitListSchema);
export default WaitList;
