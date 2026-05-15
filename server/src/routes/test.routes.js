const express = require("express");

const protect = require("../middleware/auth.middleware");

const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

/*
=================================
Admin Route
=================================
*/

router.get(
  "/admin",
  protect,
  authorizeRoles("ADMIN"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

/*
=================================
Member Route
=================================
*/

router.get(
  "/member",
  protect,
  authorizeRoles("ADMIN", "MEMBER"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Member",
    });
  }
);

module.exports = router;