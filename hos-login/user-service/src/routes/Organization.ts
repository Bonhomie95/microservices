import express from "express";
import OrganizationController from "../controller/OrganizationController";
import UserController from "../controller/UserController";
import Authenticate from "../middlewares/guards/Authenticate";
import OrganizationValidator from "../middlewares/validators/OrganizationValidator";
import UserValidator from "../middlewares/validators/UserValidator";

const router = express.Router();

router.post(
    "",
    Authenticate,
    OrganizationValidator.checkCreate(),
    OrganizationController.create
);

export default router;
