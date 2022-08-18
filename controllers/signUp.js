const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const signUp = async function(req, res) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    })

    if (user) return res.render('register', { title: 'Express' });

    await prisma.user.create({data: req.body})
  } catch (e) {
    return res.render('register', { title: 'Express' });
  }
  res.redirect('/');
}

module.exports = signUp
