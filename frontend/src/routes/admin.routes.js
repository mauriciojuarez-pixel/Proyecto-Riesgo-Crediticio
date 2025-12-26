const express = require("express");
const router = express.Router();

const {
    getUsuarios,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/admin.controller");

router.get("/usuarios", getUsuarios);
router.post("/usuarios", createUser);
router.put("/usuarios/:id", updateUser);
router.delete("/usuarios/:id", deleteUser);

module.exports = router;
