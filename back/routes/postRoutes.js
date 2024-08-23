const router = require('express').Router(); // api path를 전달해 주는 메서드
const { postTask } = require('../controllers/postTask');
const { postUser, loginUser } = require('../controllers/postUser');

router.post('/post_task', postTask);
router.post('/register', postUser);
router.post('/login', loginUser);

module.exports = router;
