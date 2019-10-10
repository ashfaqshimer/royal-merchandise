import React, { useState, useEffect } from 'react';
import { Message, Form, Segment, Button, Icon } from 'semantic-ui-react';
import Link from 'next/link';

import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { handleLogin } from '../utils/auth';

const INITIAL_STATE = {
	name: '',
	email: '',
	password: ''
};

const signup = () => {
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
			const url = `${baseUrl}/api/signup`;
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
				icon='settings'
				header='Get started!'
				content='Create a new account'
				color='teal'
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
						icon='user'
						iconPosition='left'
						label='Name'
						placeholder='Name'
						name='name'
						value={user.name}
						onChange={handleChange}
					/>
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
						icon='signup'
						type='submit'
						color='orange'
						content='Signup'
						disabled={disabled || loading}
					/>
				</Segment>
			</Form>
			<Message attached='bottom' warning>
				<Icon name='help' />
				Existing User?{' '}
				<Link href='/login'>
					<a>Log in here</a>
				</Link>{' '}
				instead.
			</Message>
		</>
	);
};

export default signup;
