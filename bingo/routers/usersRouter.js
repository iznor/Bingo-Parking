const { Router } = require('express');
const { usersController } = require('../controllers/usersController');
const userAuth = require('../middleware/userAuth')

const userRouter = new Router();

userRouter.post('/login', usersController.login);
userRouter.put('/:email',userAuth.verifyToken, usersController.editUser);
userRouter.get('/:email/orders',userAuth.verifyToken , usersController.getUserOrdersByEmail);
module.exports = { userRouter };