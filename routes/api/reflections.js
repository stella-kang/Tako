const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Reflection = require('../../models/Reflection');
const validateReflection = require('../../validation/reflection');

router.get('/users/:userId',
  async (req, res) => {
    try {
      const reflections = await Reflection.find({ user: req.params.userId })
        .sort({ createdAt: 1 })

      res.json(reflections);

    } catch {
      res.status(404);
      res.json({ error: "No reflections yet!" });
    }
});

router.post('/users/:userId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateReflection(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    };

    const newReflection = new Reflection(
      {
        prompt: req.body.prompt,
        entry: req.body.entry,
        user: req.user.id
      }
    );

    await newReflection.save();
    res.json(newReflection);
  }
);

router.patch('/:reflectionId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {

    try {
      const editedReflection = await Reflection.findOne({ reflection: req.params.reflectionId })

      editedReflection.entry = req.body.entry;

      await editedReflection.save();
      res.json(editedReflection);

    } catch {
      res.status(404);
      res.json({ error: "Reflection doesn't exist!" });
    }
  }
);

router.delete('/:reflectionId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {

    const deletedReflection = await Reflection.findOne({ reflection: req.params.reflectionId })

    deletedReflection
      .remove()
      .then(reflection => res.json(reflection))
  }
);

module.exports = router;
