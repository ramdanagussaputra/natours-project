/* eslint-disable */
import { hidePopUp, showPopUp } from './login.js';

export default async function (data, type) {
  try {
    const endpoint = type === 'password' ? 'updateMyPassword' : 'updateMe';

    const res = await axios({
      url: `http://localhost:3000/api/v1/users/${endpoint}`,
      method: 'PATCH',
      data,
    });

    type === 'password'
      ? showPopUp('success', 'Password updated')
      : showPopUp('success', 'Data updated');
  } catch (err) {
    console.error(err);
    showPopUp('error', err.response.data.message);
  }
}
