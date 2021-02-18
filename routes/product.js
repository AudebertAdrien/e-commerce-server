const express = require("express");
const router = express.Router();

const multer = require("../middlewares/multer");

const productCtrl = require("../controllers/product");

router.get("/", productCtrl.getAllProduct);
router.get("/:id", productCtrl.getOneProduct);
router.post("/", multer.single("file"), productCtrl.createProduct);
router.put("/:id", productCtrl.updateProduct);
router.delete("/:id", productCtrl.deleteProduct);

module.exports = router;
