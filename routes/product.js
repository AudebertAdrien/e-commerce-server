const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/product");
const auth = require("../middlewares/auth");

router.get("/", auth, productCtrl.getAllProduct);
router.get("/:id", auth, productCtrl.getOneProduct);
router.post("/", auth, productCtrl.createProduct);
router.put("/:id", auth, productCtrl.updateProduct);
router.delete("/:id", auth, productCtrl.deleteProduct);

module.exports = router;
