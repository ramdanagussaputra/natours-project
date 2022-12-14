import { showPopUp } from './login';

const stripe = Stripe(
  'pk_test_51LWN6VFI2ilgj0fiMOeStkzpJMGxdWbJKMBF9OZEC7JgCAbtP0yZ6dTWZO2tvyoEbz0hTAsUxOw8xtaGMuIoDUVL00eEhNfbED'
);

export default async (tourId) => {
  try {
    const res = await axios(`/api/v1/booking/create-season/${tourId}`);

    const { sessions } = res.data;

    // await stripe.redirectToCheckout({ sessionId: sessions.id });
    window.location.assign(`${sessions.url}`);
  } catch (err) {
    showPopUp('error', 'Payment failed');
    console.error(err);
  }
};
