import express from "express";
import OrganizationController from "../controller/OrganizationController.js";
import Authenticate from "../middlewares/guards/Authenticate.js";
import OrganizationValidator from "../middlewares/validators/OrganizationValidator.js";
const router = express.Router();
router.post("", Authenticate, OrganizationValidator.checkCreate(), OrganizationController.create);
export default router;
