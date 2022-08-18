const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { checkSchema } = require('express-validator');

const registerValidator = checkSchema({
  email: {
    isEmail: {
      errorMessage: 'email is not valid',
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: { min: 7 },
    },
  },
  address: {
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: { min: 7 },
    },
  },
})

const checkUserExists = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    })

    if (user) return res.render('register', { title: 'Express' });
  } catch (e) {
    return res.render('register', { title: 'Express' });
  }
  next()
}

module.exports = { registerValidator, checkUserExists }
