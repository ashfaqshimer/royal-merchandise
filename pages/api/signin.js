import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return res
				.status(404)
				.send('No user with that email exists in the database.');
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (passwordsMatch) {
			const token = jwt.sign(
				{ userId: user._id },
				process.env.JWT_SECRET,
				{
					expiresIn: '7d'
				}
			);
			res.status(200).send(token);
		} else {
			res.status(401).send('Passwords do not match');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Error logging in user.');
	}
};
