const router = require('express').Router();
const userController = require('../controllers/user');
const isAuthenticated = require('../middleware/authMiddleware').isAuthenticated;



router.get('/', userController.healthcheck);

router.get('/find/', userController.getAllUsers);
router.get('/find/authenticated', isAuthenticated, userController.getUserByToken);
router.get('/find/:userId', userController.getUser);
router.get('/search', userController.getUserByQuery);


router.post('/register', userController.register);
router.put('/', isAuthenticated, userController.updateUser);


module.exports = router;