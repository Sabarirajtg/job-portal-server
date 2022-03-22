const express = require("express");
const UserAuth = require("../middleware_auth/UserAuth");
const UserService = require("../controllers/User");
const router = express.Router();

router.post("/", UserService.addUser);

router.get("/", UserAuth, UserService.getAllUsers);

router.get("/:id", UserAuth, UserService.getUser);

router.put("/:id", UserAuth, UserService.updateUser);

router.delete("/:id", UserAuth, UserService.deleteUser);

router.post("/login", UserService.login);

router.post("/resetpassword", UserService.resetPassword);

module.exports = router;
