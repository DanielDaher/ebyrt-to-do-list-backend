const router = require("express").Router();
const loginController = require('../controllers/loginController');

router.post('/', loginController.makeSingature);

module.exports = router;
