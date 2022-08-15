/* eslint-disable */
import { hidePopUp, showPopUp, login } from './login';
import logout from './logout';
import updateSetting from './updateSetting';
import checkoutPayment from './stripe';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// DOM
const loginForm = document.querySelector('.form-login');
const logoutForm = document.querySelector('.nav__el--logout');
const updateUserForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-settings');
const payBtn = document.getElementById('btn-payment');

// LISTENER
loginForm?.addEventListener('submit', function (e) {
  e.preventDefault();

  const { email, password } = Object.fromEntries(new FormData(this).entries());

  login(email, password);
});

logoutForm?.addEventListener('click', logout);

updateUserForm?.addEventListener('submit', function (e) {
  e.preventDefault();

  const userUpdated = new FormData(this);

  console.log(userUpdated);

  updateSetting(userUpdated, 'user');
});

updatePasswordForm?.addEventListener('submit', async function (e) {
  e.preventDefault();

  document.querySelector('.btn--save-password').textContent = 'Updating....';

  const newPass = Object.fromEntries(new FormData(this).entries());

  await updateSetting(newPass, 'password');

  document.querySelector('.btn--save-password').textContent = 'Save password';

  document.querySelector('.form__input--password').value = '';
  document.querySelector('.form__input--newPassword').value = '';
  document.querySelector('.form__input--newPasswordConfirm').value = '';
});

payBtn?.addEventListener('click', async function () {
  this.textContent = 'Processing...';

  await checkoutPayment(this.dataset.tourId);

  this.textContent = 'Book tour now!';
});

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showPopUp('success', alertMessage, 15);
