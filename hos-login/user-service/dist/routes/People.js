import express from 'express';
import PeopleController from '../controller/PeopleController.js';
import Authenticate from '../middlewares/guards/Authenticate.js';
// import UserValidator from '../middlewares/validators/UserValidator.js';
const router = express.Router();
router.post('',Authenticate, PeopleController.addFriend);

router.put(
  '/:id',
  Authenticate,
  PeopleController.acceptFriend
);
router.post('/list/:id', Authenticate, PeopleController.listFriends);
// router.patch(
//   '/me',
//   Authenticate,
//   PeopleController.updateProfile
// );
export default router;
