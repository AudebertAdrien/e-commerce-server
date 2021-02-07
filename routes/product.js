const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

const productCtrl = require("../controllers/product");

router.get("/", productCtrl.getAllProduct);
router.get("/:id", productCtrl.getOneProduct);
router.post("/", multer, productCtrl.createProduct);
router.put("/:id", multer, productCtrl.updateProduct);
router.delete("/:id", productCtrl.deleteProduct);

module.exports = router;
