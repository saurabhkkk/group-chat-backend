const express = require("express");
const userController = require("../controllers/userController");
//const authMiddleware = require("../middleware/authMiddleware");
//const adminMiddleware = require("../middleware/adminMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, userController.createUser);
router.put(
  "/:userId",
  authMiddleware,
  adminMiddleware,
  userController.updateUser
);

module.exports = router;
