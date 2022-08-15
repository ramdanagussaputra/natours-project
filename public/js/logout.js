/* eslint-disable */

export default async function () {
  try {
    const res = await axios({
      url: '/api/v1/users/logout',
      method: 'GET',
    });

    window.location.reload();
  } catch (err) {
    showPopUp('error', err.message);
    console.error(err);
  }
}
