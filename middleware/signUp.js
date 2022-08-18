const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const checkUserExists = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    if (!user) return res.render('sign-up');
  } catch (e) {
    return res.render('sign-up');
  }
  next()
}

module.exports = checkUserExists