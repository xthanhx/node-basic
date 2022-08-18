var express = require('express');
var router = express.Router();
const registerUser = require('../controllers/registerUser')
const { registerValidator, checkUserExists } = require('../middleware/user')
const signUp = require('../middleware/signUp')

router.get('/', function(_, res) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res) {
  console.log(req.session);
  if (req.session.User && req.session.User.email)
    return res.redirect('/');
  res.render('register');
});

router.post('/register',
  registerValidator,
  checkUserExists,
  registerUser
);

router.get('/signup', function(_, res) {
  res.render('sign-up');
});

router.post('/signup', signUp, function(req, res) {
  req.session.User = {
    email: req.body.email
  }
  res.redirect('/')
});

module.exports = router;
