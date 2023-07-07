const router = require('express').Router();
const authController = require('../controllers/auth');



router.get('/', authController.healthcheck);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


module.exports = router;