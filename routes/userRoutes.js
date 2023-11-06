const express = require("express");
const {
    createUser,
    findAllUsers,
    findSingleUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/", createUser);
router.get("/", findAllUsers);
router.get("/:id", findSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
