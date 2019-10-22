'use strict';

const chai = require('chai');
const expect = chai.expect;
const Loop = require('./loop');
const db = require('../index');
const Promise = require('bluebird');

describe('Models', function() {
  before(function() {
    return db.sync({ force: true });
  });

  describe('The `Loop` model', function() {
    //initial force sync to clear the db

    //create loop BEFORE EACH test
    let loop;
    let title = 'Cool Loop';
    let description = 'Roof Roof Roof';
    let sound1 = [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    let sound2 = [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    let sound3 = [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    let sound4 = [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    let sound5 = [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    let sound6 = [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    let sound7 = [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    let sound8 = [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];

    beforeEach(function() {
      loop = Loop.build({
        title,
        description,
        sound1,
        sound2,
        sound3,
        sound4,
        sound5,
        sound6,
        sound7,
        sound8
      });
    });

    //remove loop AFTER EACH test
    //cascade:true `Only used in conjunction with TRUNCATE. Truncates all tables that have foreign-key references to the named table, or to any tables added to the group due to CASCADE`.
    //src: http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-truncate
    afterEach(function() {
      return Loop.truncate({ cascade: true });
    });

    describe('attributes definition', () => {
      it('includes `title` and `description` fields', () => {
        return loop.save().then(savedLoop => {
          expect(savedLoop.title).to.equal('Cool Loop');
          expect(savedLoop.description).to.equal('Roof Roof Roof');
        });
      });

      it('requires `sound1`', () => {
        loop.sound1 = null;
        return loop.validate().then(
          () => {
            throw new Error('validation should fail when sound1 is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `sound2`', () => {
        loop.sound2 = null;
        return loop.validate().then(
          () => {
            throw new Error('validation should fail when sound2 is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `sound3`', () => {
        loop.sound3 = null;
        return loop.validate().then(
          () => {
            throw new Error('validation should fail when sound3 is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `sound4`', () => {
        loop.sound4 = null;
        return loop.validate().then(
          () => {
            throw new Error('validation should fail when sound4 is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `sound5`', () => {
        loop.sound5 = null;
        return loop.validate().then(
          () => {
            throw new Error('validation should fail when sound5 is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `sound6`', () => {
        loop.sound6 = null;
        return loop.validate().then(
          () => {
            throw new Error('validation should fail when sound6 is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `sound7`', () => {
        loop.sound7 = null;
        return loop.validate().then(
          () => {
            throw new Error('validation should fail when sound7 is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `sound8`', () => {
        loop.sound8 = null;
        return loop.validate().then(
          () => {
            throw new Error('validation should fail when sound8 is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });
      //end of `attributes definition` describe block
    });
    //end of `The Loops model` describe block
  });
});
