const router = require('express').Router();
const { User, Loop } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/loops', async (req, res, next) => {
  try {
    const allLoops = await Loop.findAll({ where: { userId: req.user.id } });

    res.json(allLoops);
  } catch (err) {
    next(err);
  }
});

router.post('/loops', async (req, res, next) => {
  try {
    const newloop = await Loop.findOrCreate({
      //create new loop in our loop model
      where: {
        title: req.body.title,
        sound1: req.body.sound1 // sound1 for now. SoundId later?
      }
    });

    const user = await User.findByPk(req.body.userId);

    await newloop[0].setUser(user);
    //userId was created autommatically due to association

    res.json(newloop.id);
  } catch (err) {
    next(err);
  }
});
