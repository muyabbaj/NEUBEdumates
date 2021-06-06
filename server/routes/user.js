const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
// const User = mongoose.model("User")
// const Post = mongoose.model("Post")

const User = require('../models/user');
const Post = require('../models/post');

router.get('/user/:id', requireLogin, (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((user) => {
      Post.find({ postedBy: id })
        .populate('postedBy', '_id name pic')
        .populate('comments.postedBy', '_id name pic')
        .then((posts) => {
          res.json({ user, posts });
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
});

router.put('/follow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

router.put('/unfollow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});
router.put('/updatepic', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: 'pic canot post' });
      }
      res.json(result);
    }
  );
});

router.post('/search-users', (req, res) => {
  let userPattern = new RegExp('^' + req.body.query);
  User.find({ name: { $regex: userPattern } })
    .select('_id name email')
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
