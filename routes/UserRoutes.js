const express = require("express");
const UserAuth = require("../middleware_auth/UserAuth");
const UserController = require("../controllers/User");
const router = express.Router();

router.post("/", UserController.addUser);

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

router.post("/login", UserController.login);

router.post("/resetpassword", UserController.resetPassword);

module.exports = router;
