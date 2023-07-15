const router = require('express').Router();
const likeController = require('../controllers/like');
const isAuthenticated = require('../middleware/authMiddleware').isAuthenticated;

router.get('/', isAuthenticated, likeController.getLikes);
router.post('/', isAuthenticated, likeController.createLike);
router.delete('/', isAuthenticated, likeController.deleteLike);


module.exports = router;