const router = require('express').Router();
const relationshipController = require('../controllers/relationship');
const isAuthenticated = require('../middleware/authMiddleware').isAuthenticated;

router.get('/', isAuthenticated, relationshipController.getRelationship);
router.post('/', isAuthenticated, relationshipController.createRelationship);
router.delete('/', isAuthenticated, relationshipController.deleteRelationship);


module.exports = router;