const router = require("express").Router();
const tasksController = require('../controllers/tasksController');
const validateToken = require('../auth/validateJWT');

router.get('/', validateToken, tasksController.getAll);
router.get('/:id', validateToken, tasksController.getById);
router.post('/', validateToken, tasksController.create);
router.put('/:id', validateToken, tasksController.updateTaskById);
router.delete('/:id', validateToken, tasksController.removeTaskById);

module.exports = router;