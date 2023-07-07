const router = require('express').Router();
const userController = require('../controllers/user');



router.get('/', userController.healthcheck);

router.get('/find/', userController.getAllUsers);
router.get('/find/:userId', userController.getUser);

router.post('/register', userController.register);
router.put('/:userId', userController.updateUser);


module.exports = router;