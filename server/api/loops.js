const router = require('express').Router();
const { User, Loop } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allLoops = await Loop.findAll({
      where: {
        userId: req.user.id
      }
    });

    res.json(allLoops);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newloop = await Loop.findOrCreate({
      //create new loop in our loop model
      where: {
        title: req.body.title,
        sound1: req.body.sound1 // sound1 for now. SoundId later?
      }
    });

    // const user = await User.findByPk(req.body.userId);
    const user = await User.findByPk(req.user.id);

    await newloop[0].setUser(user);
    //userId was created autommatically due to association

    res.json(newloop[0]);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const oneLoop = await Loop.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id
      }
    });

    res.json(oneLoop);
  } catch (err) {
    next(err);
  }
});
