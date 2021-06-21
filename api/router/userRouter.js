const router = require("express").Router();
const { genValidate } = require("../config");
const {
  userController: {
    login,
    register,
    emailVerification,
    forgotPassword,
    resendVerification,
    resetPassword,
    keepLogged,
  },
} = require("../controller");
const { regValidator } = require("../handlers");

router.post("/login", login);
router.post("/register", regValidator, register);
router.post("/logged", genValidate, keepLogged);
router.post("/activate/:token", genValidate, emailVerification);
router.post("/resend-activate", resendVerification);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", genValidate, resetPassword);

module.exports = router;
