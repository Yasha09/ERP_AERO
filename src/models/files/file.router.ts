import {Router} from "express";
import {upload} from "./common/file.validator";
import fileController from "./file.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";

const fileRouter = Router();

fileRouter.use(authMiddleware)

fileRouter.post("/", upload.single('file'), fileController.upload)
fileRouter.get("/list", fileController.list)
fileRouter.get("/:id", fileController.get)
fileRouter.put("/update/:id", fileController.update)
fileRouter.delete("/delete/:id", fileController.delete)


export default fileRouter;