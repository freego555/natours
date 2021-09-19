const express = require('express');
const userContoller = require('./../controllers/userContoller');

const router = express.Router();

router.route('/').get(userContoller.getAllUsers).post(userContoller.createUser);

router
  .route('/:id')
  .get(userContoller.getUserById)
  .patch(userContoller.updateUserById)
  .delete(userContoller.deleteUserById);

module.exports = router;
