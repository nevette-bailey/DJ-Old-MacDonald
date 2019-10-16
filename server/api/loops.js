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
    const newloop = await Loop.create({
      //create new loop in our loop model
      title: req.body.title,
      description: req.body.description,
      sound1: req.body.sound1,
      sound2: req.body.sound2,
      sound3: req.body.sound3,
      sound4: req.body.sound4,
      sound5: req.body.sound5,
      sound6: req.body.sound6,
      sound7: req.body.sound7,
      sound8: req.body.sound8
    });
    // const user = await User.findByPk(req.body.userId);
    const user = await User.findByPk(req.user.id);
    await newloop.setUser(user);
    //userId was created autommatically due to association
    res.json(newloop);
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

router.put('/:id', async (req, res, next) => {
  try {
    console.log('INSIDE PUT: ', req.body);
    console.log('USERID', req.user.id);
    console.log('loop id: ', req.params.id);
    // let title = ''
    // if(req.body.title !== undefined){
    const [numAffectedRows, affectedRows] = await Loop.update(
      {
        sound1: req.body.sound1,
        sound2: req.body.sound2,
        sound3: req.body.sound3,
        sound4: req.body.sound4,
        sound5: req.body.sound5,
        sound6: req.body.sound6,
        sound7: req.body.sound7,
        sound8: req.body.sound8
      },
      {
        where: {
          userId: req.user.id,
          id: req.params.id
        },
        returning: true,
        plain: true
      }
    );
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const numAffectedRows = await Loop.destroy({
      where: {
        userId: req.user.id,
        id: req.params.id
      }
    });
    if (numAffectedRows) {
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
});
