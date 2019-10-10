import mongoose from 'mongoose';

const connection = {};

const connectDb = async () => {
	try {
		if (connection.isConnected) {
			console.log('Using existing connection');
			return;
		}
		const db = await mongoose.connect(process.env.MONGO_SRV, {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('DB connected!');
		connection.isConnected = db.connections[0].readyState;
	} catch (err) {
		console.error('Unable to connect to the db');
	}
};

export default connectDb;
