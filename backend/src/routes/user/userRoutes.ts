import express, { NextFunction, Request, Response } from "express"
import { authController } from "../../di/auth/container";
import { InputDataValidator } from "../../middlewares/inputDataValidator";
import { userRegisterSchema } from "../../zodSchemas/registerSchema";
const router = express.Router();
router.post("/register",InputDataValidator.validate(userRegisterSchema),(req: Request, res: Response, next : NextFunction) => authController.register(req,res, next));


export default router