import express from "express";
import { upload } from "../../helper/cloudinaryConfig.js";
import {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
} from "../../controllers/admin/productController.js";

const router = express.Router();

router.post("/uploadimage", upload.single("myFile"), handleImageUpload);
router.post("/addProduct", addProduct);
router.put("/editProduct/:id", editProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/fetchProduct", fetchProduct);

export default router;
