import express from 'express';
import UserController from '../controller/UserController.js';
import Authenticate from '../middlewares/guards/Authenticate.js';
import UserValidator from '../middlewares/validators/UserValidator.js';
const router = express.Router();
router.post('', UserValidator.checkCreateUser(), UserController.createUser);
router.put(
  '/me/password',
  Authenticate,
  UserValidator.checkChangePassword(),
  UserController.changePassword
);
router.get('/me', Authenticate, UserController.getProfile);
router.patch(
  '/me',
  Authenticate,
  UserValidator.checkUpdateProfile(),
  UserController.updateProfile
);
export default router;
