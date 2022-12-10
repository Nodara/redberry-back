const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');

router.post('/sign-in', AuthController.signIn);
router.post('/sign-up', AuthController.signUp);

module.exports = router;