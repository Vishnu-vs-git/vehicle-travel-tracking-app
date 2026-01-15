import express, { NextFunction, Request, Response } from "express"
import { authController } from "../../di/auth/container";
import { InputDataValidator } from "../../middlewares/inputDataValidator";
import { userRegisterSchema } from "../../zodSchemas/registerSchema";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { AuthRequest } from "../../types/auth-request";
const router = express.Router();
router.post("/register",InputDataValidator.validate(userRegisterSchema),(req: Request, res: Response, next : NextFunction) => authController.register(req,res, next));
router.get("/check-auth",AuthMiddleware.authenticate.bind(AuthMiddleware),(req: AuthRequest, res :Response,next:NextFunction) => {
   res.json({authenticated:true})
})


export default router