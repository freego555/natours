const express = require('express');
const userContoller = require('../controllers/userContoller');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);

router.route('/').get(userContoller.getAllUsers).post(userContoller.createUser);

router
  .route('/:id')
  .get(userContoller.getUserById)
  .patch(userContoller.updateUserById)
  .delete(userContoller.deleteUserById);

module.exports = router;
