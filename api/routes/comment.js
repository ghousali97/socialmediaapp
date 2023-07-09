const router = require('express').Router();
const commentController = require('../controllers/comment');
const isAuthenticated = require('../middleware/authMiddleware').isAuthenticated;

router.get('/all', commentController.getAllComment);
router.get('/', isAuthenticated, commentController.getCommentByPost);
router.post('/', isAuthenticated, commentController.createComment);
//router.get('/timeline', isAuthenticated, postController.getTimelinePost);


module.exports = router;