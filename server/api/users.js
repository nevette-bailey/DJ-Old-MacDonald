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
//post a track to specific user
router.post('/loops', async (req, res, next) => {
  try {
    //association will generate a user_loop tabld

    const loop = await Loop.findOrCreate({
      //create new loop in our loop model
      where: {
        title: req.body.title,
        sound1: req.body.sound1 // sound1 for now. SoundId later?
      }
    });

    //userId was created autommatically due to association

    const currentUser = await User.findByPk(req.body.userId);
    await currentUser.addLoop(loop[0]);
    res.json(loop[0]);
  } catch (err) {
    next(err);
  }
});
