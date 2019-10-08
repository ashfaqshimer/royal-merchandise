import React, { useEffect } from 'react';
import axios from 'axios';

const Index = ({ products }) => {
	console.log(products);

	return <div>Home</div>;
};

Index.getInitialProps = async () => {
	// fetch data on server
	const url = 'http://localhost:3000/api/products';
	const response = await axios.get(url);
	// return data as an object
	return { products: response.data };
	// this object will be merged with existing props
};

export default Index;
