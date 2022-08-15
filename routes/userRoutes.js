const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch(
  '/updateMe',
  userController.uploadUserImg,
  userController.resizeUserImg,
  userController.updateMe
);
router.delete('/inactiveMe', userController.inactiveMe);
router.get('/me', userController.getMe, userController.getUser);

router.use(authController.restrictTo('admin'));

// prettier-ignore
router.route('/')
    .get(userController.getUsers)

// prettier-ignore
router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;
