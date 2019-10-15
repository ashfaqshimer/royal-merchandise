import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Message, Form, Segment, Button, Icon } from 'semantic-ui-react';
import Link from 'next/link';

import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

const INITIAL_STATE = {
	email: '',
	password: ''
};

const signin = () => {
	const [user, setUser] = useState(INITIAL_STATE);
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const isValid = Object.values(user).every((input) => Boolean(input));
		if (isValid) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [user]);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			setError('');
			setLoading(true);
			const url = `${baseUrl}/api/signin`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
			handleLogin(response.data);
		} catch (err) {
			catchErrors(err, setError);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Message
				attached
				icon='privacy'
				header='Welcome Back!'
				content='Login with your email and password'
				color='blue'
			/>
			<Form
				loading={loading}
				onSubmit={handleSubmit}
				error={Boolean(error)}
			>
				<Message error header='Ooops' content={error} />
				<Segment>
					<Form.Input
						fluid
						icon='mail'
						iconPosition='left'
						label='Email'
						placeholder='Email'
						name='email'
						type='email'
						value={user.email}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						icon='lock'
						iconPosition='left'
						label='Password'
						placeholder='password'
						name='password'
						type='password'
						value={user.password}
						onChange={handleChange}
					/>
					<Button
						icon='sign in'
						type='submit'
						color='orange'
						content='Log In'
						disabled={disabled || loading}
					/>
				</Segment>
			</Form>
			<Message attached='bottom' warning>
				<Icon name='help' />
				New User?{' '}
				<Link href='/signup'>
					<a>Signup here</a>
				</Link>{' '}
				instead.
			</Message>
		</>
	);
};

export default signin;
