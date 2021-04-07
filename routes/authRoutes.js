const {Router} = require('express');
const authController = require('../controller/authController')


const router = Router()
router.post('/signup',authController.post_signup);
router.get('/signup',authController.get_signup);
router.post('/login',authController.post_login);
router.get('/login',authController.get_login);
router.get('/logout',authController.get_logout);
module.exports = router;