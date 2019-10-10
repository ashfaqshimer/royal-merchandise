import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import connectDb from '../../utils/connectDb';
import User from '../../models/User';

connectDb();

export default async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		console.log(user);
		if (user) {
			return res
				.status(422)
				.send(`User with email ${email} already exists.`);
		}

		const hash = await bcrypt.hash(password, 10);

		const newUser = await new User({ name, email, password: hash }).save();
		console.log({ newUser });
		const token = jwt.sign(
			{ userId: newUser._id },
			process.env.JWT_SECRET,
			{
				expiresIn: '7d'
			}
		);
		res.status(201).json(token);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error signing up user.');
	}
};
