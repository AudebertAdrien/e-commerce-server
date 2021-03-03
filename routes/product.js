const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const productCtrl = require("../controllers/product");

router.get("/", productCtrl.getAllProduct);
router.get("/:id", productCtrl.getOneProduct);
router.post("/", upload.array("file"), productCtrl.createProduct);
router.put("/:id", upload.array("file"), productCtrl.updateProduct);
router.delete("/:id", productCtrl.deleteProduct);

module.exports = router;
