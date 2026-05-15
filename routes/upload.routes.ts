import express
    from "express";
import { remove, upload } from "../controllers/upload/upload.controller";


const router =
    express.Router();

router.post(
    "/",
    upload
);

router.delete(
    "/",
    remove
);

export default router;