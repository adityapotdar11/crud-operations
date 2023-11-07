const express = require("express");
const {
    createUser,
    findAllUsers,
    findSingleUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");
const jwtAuthentication = require("../middleware/auth");
const {
    createUserValidation,
    updateUserValidation,
} = require("../middleware/validation/userValidation");
const router = express.Router();

router.post("/", jwtAuthentication, createUserValidation, createUser);
router.get("/", jwtAuthentication, findAllUsers);
router.get("/:id", jwtAuthentication, findSingleUser);
router.put("/:id", jwtAuthentication, updateUserValidation, updateUser);
router.delete("/:id", jwtAuthentication, deleteUser);

module.exports = router;
