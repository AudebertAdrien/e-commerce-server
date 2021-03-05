const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const authController = require("../controllers/auth");

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.findOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unFollow);

module.exports = router;
