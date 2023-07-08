const router = require('express').Router();
const postController = require('../controllers/post');
const isAuthenticated = require('../middleware/authMiddleware').isAuthenticated;

router.get('/', postController.getAllPost);
router.post('/', isAuthenticated, postController.createPost);
router.get('/timeline', isAuthenticated, postController.getTimelinePost);


module.exports = router;