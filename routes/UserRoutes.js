const express = require("express");
const UserAuth = require("../middleware_auth/UserAuth");
const UserService = require("../services/UserService");
const router = express.Router();

router.post("/", UserService.addUser);

router.get("/", UserAuth, UserService.getAllUsers);

router.get("/:id", UserAuth, UserService.getUser);

router.put("/:id", UserAuth, UserService.updateUser);

router.delete("/:id", UserAuth, UserService.deleteUser);

router.post("/login", UserService.login);

module.exports = router;
