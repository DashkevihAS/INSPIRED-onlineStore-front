import { API_URL } from '../const';

export const sendOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/api/order`, {
    method: 'POST',
    body: JSON.stringify(orderData),
  });

  return res.json();
};
