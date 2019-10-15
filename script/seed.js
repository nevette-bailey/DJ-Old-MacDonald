'use strict';

const db = require('../server/db');
const { User, Loop } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ]);

  // const loops = await Promise.all([
  //   Loop.create({
  //     title: 'My Sound',
  //     description: 'My spookiest creation yet.',
  //     sound1: [
  //       true,
  //       false,
  //       true,
  //       true,
  //       false,
  //       true,
  //       false,
  //       false,
  //       true,
  //       true,
  //       true,
  //       true,
  //       true,
  //       true,
  //       true,
  //       true
  //     ],
  //     sound2: [
  //       true,
  //       true,
  //       true,
  //       true,
  //       true,
  //       true,
  //       true,
  //       true,
  //       true,
  //       false,
  //       true,
  //       true,
  //       false,
  //       true,
  //       false,
  //       false
  //     ],
  //     sound3: [],
  //     sound4: [],
  //     sound5: [],
  //     sound6: [],
  //     sound7: [],
  //     sound8: []
  //   })
  // ]);

  console.log(`seeded ${users.length} users`);
  // console.log(`seeded ${loops.length} loops`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
