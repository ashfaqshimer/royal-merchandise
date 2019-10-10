import React, { useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import baseUrl from '../utils/baseUrl';

const Index = ({ products }) => {
	return (
		<div>
			<ProductList products={products} />
		</div>
	);
};

Index.getInitialProps = async () => {
	// fetch data on server
	const url = `${baseUrl}/api/products`;
	const response = await axios.get(url);
	// return data as an object
	return { products: response.data };
	// this object will be merged with existing props
};

export default Index;
