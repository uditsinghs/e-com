import express from "express";
import { isAuthenticated, isAuthorized } from "../middleware/authentication.js";
import upload from "../middleware/multer.js";
import {
  addProduct,
  addWishlist,
  deleteProduct,
  getAllProduct,
  getAllWiseListProduct,
  getSingleProduct,
  removeFromWishlist,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();
router.post(
  "/add",
  isAuthenticated,
  isAuthorized("admin"),
  upload.single("image"),
  addProduct
);
router.get("/get", getAllProduct);
router.get("/get/:pid", getSingleProduct);
router.delete(
  "/delete/:pid",
  isAuthenticated,
  isAuthorized("admin"),
  deleteProduct
);
router.put(
  "/update/:pid",
  isAuthenticated,
  isAuthorized("admin"),
  upload.single("image"),
  updateProduct
);
// wishlist
router.post("/add-wishlist/:pid", isAuthenticated, addWishlist);
router.delete("/delete-wishlist/:pid", isAuthenticated, removeFromWishlist);
router.get("/get-wishlist", isAuthenticated, getAllWiseListProduct);
export default router;