import React, { useState, useEffect } from 'react';
import { Divider, Segment, Button } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';
import StripeCheckout from 'react-stripe-checkout';

const CartSummary = ({ products, handleCheckout, success }) => {
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setIsCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <StripeCheckout
        name='Royal Merchandise'
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ''}
        currency='USD'
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey='pk_test_Axjj4yaApwOyJlkSfDfCXbzI00s7wxILNk'
        token={handleCheckout}
        triggerEvent='onClick'
        disabled={isCartEmpty || success}
      >
        <Segment clearing size='large'>
          <strong>Sub Total:</strong> ${cartAmount}
          <Button
            icon='cart'
            color='teal'
            floated='right'
            content='Checkout'
            disabled={isCartEmpty || success}
          />
        </Segment>
      </StripeCheckout>
    </>
  );
};

export default CartSummary;
