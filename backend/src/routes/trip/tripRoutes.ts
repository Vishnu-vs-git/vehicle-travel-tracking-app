import { NextFunction, Response, Router } from "express";
import multer from "multer"
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { AuthRequest } from "../../types/auth-request";
import { tripController } from "../../di/trip/container";

const router = Router();
const upload = multer({dest: "uploads/"});

router.get("/user",AuthMiddleware.authenticate.bind(AuthMiddleware),(req: AuthRequest, res: Response, next:NextFunction) => tripController.getTrips(req, res, next));
 router.post("/upload",AuthMiddleware.authenticate.bind(AuthMiddleware),upload.single("file"),(req: AuthRequest, res : Response, next: NextFunction) => tripController.uploadTrip(req,res,next));
 router.get("/:tripId",AuthMiddleware.authenticate.bind(AuthMiddleware),(req: AuthRequest, res: Response, next:NextFunction) => tripController.getTripGps(req, res, next));
 router.get("/trip-detail/:tripId",AuthMiddleware.authenticate.bind(AuthMiddleware),(req: AuthRequest, res: Response, next:NextFunction) => tripController.getTrip(req, res, next));
 router.delete("/delete/:tripId",AuthMiddleware.authenticate.bind(AuthMiddleware),(req: AuthRequest, res: Response, next:NextFunction) => tripController.deleteTrip(req, res, next));


export default router