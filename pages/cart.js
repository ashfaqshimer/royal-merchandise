import React, { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import { Segment } from 'semantic-ui-react';

import catchErrors from '../utils/catchErrors';
import CartSummary from '../components/Cart/CartSummary';
import CartItemList from '../components/Cart/CartItemList';
import baseUrl from '../utils/baseUrl';

const cart = ({ products, user }) => {
  const [cartProducts, setCartProducts] = useState(products);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemoveFromCart = async (productId) => {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token');
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    };
    const response = await axios.delete(url, payload);
    setCartProducts(response.data);
  };

  const handleCheckout = async (paymentData) => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get('token');
      const payload = { paymentData };
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment loading={loading}>
      <CartItemList
        products={cartProducts}
        user={user}
        handleRemoveFromCart={handleRemoveFromCart}
        success={success}
      />
      <CartSummary
        products={cartProducts}
        handleCheckout={handleCheckout}
        success={success}
      />
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
