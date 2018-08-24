const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');
// const ObjectID = require('mongodb').ObjectID;
const User = require('../models/userModel');

/* Create a new User (register). */
router.post('/', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  oktaClient
    .createUser(newUser)
    .then(user => {
      // create the user on the mongo DB
      const newUserDB = {
        name: `${user.profile.firstName} ${user.profile.firstName}`,
        oktaID: user.id,
        email: user.profile.email,
        plans: [],
        tempPlaces: [],
        tempEvents: [] };

      User.create(newUserDB, (err, userResult) => {
        if (err) throw err;
        console.log('res server', userResult);
      });
      res.status(201).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// 1) to handle get user data on login
router.get('/users/:id', (req, res) => {
  const oktaID = req.params.id;

  User.find({ oktaID : oktaID }, (err, userResult) => {
    if (err) throw err;
    console.log('user from mongo', userResult);
    res.send(userResult);
  });
});

module.exports = router;
