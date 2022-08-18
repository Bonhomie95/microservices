import express from "express";
import { ResponseHandler } from "../../../lib/dist/helpers/index.js";
const router = express.Router();
router.get("/", (req, res) => {
    return ResponseHandler.ok(res, { message: "Welcome to HOS User-Service!" });
});
router.get("/health", (req, res) => {
    return ResponseHandler.ok(res, { status: "UP" });
});
export default router;
