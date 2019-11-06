import React from 'react';
import axios from 'axios';

import CartSummary from '../components/Cart/CartSummary';
import { Segment } from 'semantic-ui-react';
import CartItemList from '../components/Cart/CartItemList';
import baseUrl from '../utils/baseUrl';
import { parseCookies } from 'nookies';

const cart = ({ products }) => {
	console.log(products);
	return (
		<Segment>
			<CartItemList />
			<CartSummary />
		</Segment>
	);
};

cart.getInitialProps = async (ctx) => {
	const { token } = parseCookies(ctx);
	if (!token) {
		return { products: [] };
	}
	const url = `${baseUrl}/api/cart`;
	const payload = { headers: { Authorization: token } };
	const response = await axios.get(url, payload);
	return { products: response.data };
};

export default cart;
