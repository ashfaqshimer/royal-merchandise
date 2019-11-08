import React from 'react';
import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import baseUrl from '../utils/baseUrl';
import { parseCookies } from 'nookies';
import axios from 'axios';
import AccountPermissions from '../components/Account/AccountPermissions';

const Account = ({ user, orders }) => {
  console.log(orders);
  return (
    <div>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
      {user.role === 'root' && <AccountPermissions />}
    </div>
  );
};

Account.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/orders`;
  const response = await axios.get(url, payload);
  return response.data;
};

export default Account;
