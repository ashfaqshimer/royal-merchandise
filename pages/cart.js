import React from 'react';

import CartSummary from '../components/Cart/CartSummary';
import { Segment } from 'semantic-ui-react';
import CartItemList from '../components/Cart/CartItemList';

const cart = () => {
	return (
		<Segment>
			<CartItemList />
			<CartSummary />
		</Segment>
	);
};

export default cart;
