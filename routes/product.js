const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

const productCtrl = require("../controllers/product");

router.get("/", auth, productCtrl.getAllProduct);
router.get("/:id", auth, productCtrl.getOneProduct);
router.post("/", auth, multer, productCtrl.createProduct);
router.put("/:id", auth, productCtrl.updateProduct);
router.delete("/:id", auth, productCtrl.deleteProduct);

module.exports = router;
