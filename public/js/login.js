/* eslint-disable */

// HIDE POP UP
export const hidePopUp = function () {
  const el = document.querySelector('.alert');
  if (el) el.remove();
};

// SHOW POP UP
export const showPopUp = function (type, message) {
  hidePopUp();

  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.body.insertAdjacentHTML('afterbegin', markup);

  setTimeout(hidePopUp, 1300);
};

// SEND LOGIN DATA TO SERVER
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showPopUp(res.data.status, 'You are login');

      setTimeout(() => {
        window.location.assign('/');
      }, 1500);
    }

  } catch (err) {
    console.error(err);
    showPopUp('error', err.response.data.message);
  }
};
// prettier-ignore
// document.querySelector('.form-login')?.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   login(email, password);
// });

// LOG OUT
// document
//   .querySelector('.nav__el--logout')
//   ?.addEventListener('click', async function () {
//     try {
//       const res = await axios({
//         url: 'http://localhost:3000/api/v1/users/logout',
//         method: 'GET',
//       });

//       window.location.reload();
//     } catch (err) {
//       showPopUp('error', err.message);
//       console.error(err);
//     }
//   });
