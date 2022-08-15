const $e139f888c566a13c$export$6e95a68ad911e0f1 = function () {
  const el = document.querySelector('.alert');
  if (el) el.remove();
};
const $e139f888c566a13c$export$9e2928cdbf39782a = function (type, message) {
  $e139f888c566a13c$export$6e95a68ad911e0f1();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.body.insertAdjacentHTML('afterbegin', markup);
  setTimeout($e139f888c566a13c$export$6e95a68ad911e0f1, 1300);
};
const $e139f888c566a13c$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === "success") {
            $e139f888c566a13c$export$9e2928cdbf39782a(res.data.status, "You are login");
            setTimeout(()=>{
                window.location.assign("/");
            }, 1500);
        }
    } catch (err) {
        console.error(err);
        $e139f888c566a13c$export$9e2928cdbf39782a("error", err.response.data.message);
    }
}; // prettier-ignore
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

async function $1805d4ba236d7965$export$2e2bcd8739ae039() {
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

async function $f363f517573dbe96$export$2e2bcd8739ae039(data, type) {
  try {
    const endpoint = type === 'password' ? 'updateMyPassword' : 'updateMe';
    const res = await axios({
      url: `/api/v1/users/${endpoint}`,
      method: 'PATCH',
      data: data,
    });
    type === 'password'
      ? (0, $e139f888c566a13c$export$9e2928cdbf39782a)(
          'success',
          'Password updated'
        )
      : (0, $e139f888c566a13c$export$9e2928cdbf39782a)(
          'success',
          'Data updated'
        );
  } catch (err) {
    console.error(err);
    (0, $e139f888c566a13c$export$9e2928cdbf39782a)(
      'error',
      err.response.data.message
    );
  }
}

const $18a30030b8b89bc4$var$stripe = Stripe(
  'pk_test_51LWN6VFI2ilgj0fiMOeStkzpJMGxdWbJKMBF9OZEC7JgCAbtP0yZ6dTWZO2tvyoEbz0hTAsUxOw8xtaGMuIoDUVL00eEhNfbED'
);
var $18a30030b8b89bc4$export$2e2bcd8739ae039 = async (tourId) => {
  try {
    const res = await axios(`/api/v1/booking/create-season/${tourId}`);
    const { sessions: sessions } = res.data;
    // await stripe.redirectToCheckout({ sessionId: sessions.id });
    window.location.assign(`${sessions.url}`);
  } catch (err) {
    (0, $e139f888c566a13c$export$9e2928cdbf39782a)('error', 'Payment failed');
    console.error(err);
  }
};

// DOM
const $0ee91948b4973788$var$loginForm = document.querySelector('.form-login');
const $0ee91948b4973788$var$logoutForm =
  document.querySelector('.nav__el--logout');
const $0ee91948b4973788$var$updateUserForm =
  document.querySelector('.form-user-data');
const $0ee91948b4973788$var$updatePasswordForm = document.querySelector(
  '.form-user-settings'
);
const $0ee91948b4973788$var$payBtn = document.getElementById('btn-payment');
// LISTENER
$0ee91948b4973788$var$loginForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const { email: email, password: password } = Object.fromEntries(
    new FormData(this).entries()
  );
  (0, $e139f888c566a13c$export$596d806903d1f59e)(email, password);
});
$0ee91948b4973788$var$logoutForm?.addEventListener(
  'click',
  (0, $1805d4ba236d7965$export$2e2bcd8739ae039)
);
$0ee91948b4973788$var$updateUserForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const userUpdated = new FormData(this);
  console.log(userUpdated);
  (0, $f363f517573dbe96$export$2e2bcd8739ae039)(userUpdated, 'user');
});
$0ee91948b4973788$var$updatePasswordForm?.addEventListener(
  'submit',
  async function (e) {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating....';
    const newPass = Object.fromEntries(new FormData(this).entries());
    await (0, $f363f517573dbe96$export$2e2bcd8739ae039)(newPass, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.querySelector('.form__input--password').value = '';
    document.querySelector('.form__input--newPassword').value = '';
    document.querySelector('.form__input--newPasswordConfirm').value = '';
  }
);
$0ee91948b4973788$var$payBtn?.addEventListener('click', async function () {
  this.textContent = 'Processing...';
  await (0, $18a30030b8b89bc4$export$2e2bcd8739ae039)(this.dataset.tourId);
  this.textContent = 'Book tour now!';
});

//# sourceMappingURL=app.js.map
