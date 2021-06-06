const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
// const Post = mongoose.model('Post');
// const Notice = mongoose.model('Notice');
// const Result = mongoose.model('Result');
// const Routine = mongoose.model('Routine');
const Post = require('../models/post');
const Notice = require('../models/notice');
const Result = require('../models/result');
const Routine = require('../models/routine');
router.get('/allpost', (req, res) => {
  Post.find()
    .populate('postedBy', '_id name pic')
    .populate('comments.postedBy', '_id name pic')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/shownotice', (req, res) => {
  Notice.find()
    .then((notice) => {
      res.json(notice);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get('/showresult', (req, res) => {
  Result.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get('/showroutine', (req, res) => {
  Routine.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get('/followingpost', requireLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id name pic')
    .populate('comments.postedBy', '_id name pic')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post('/createpost', requireLogin, (req, res) => {
  const { body, pic } = req.body;

  // req.user.password = undefined
  if (pic) {
    const post = new Post({
      body,
      photo: pic,
      postedBy: req.user,
    });
    post
      .save()
      .then((result) => {
        res.json({ post: result });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const post = new Post({
      body,
      postedBy: req.user,
    });
    post
      .save()
      .then((result) => {
        // console.log(result)
        res.json({ post: result });
        res.json({ message: 'Successfully Posted' });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post('/createnotice', (req, res) => {
  const { title, pic } = req.body;

  // req.user.password = undefined
  if (pic) {
    const notice = new Notice({
      title,
      photo: pic,
    });
    notice
      .save()
      .then((result) => {
        res.json({ notice: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post('/uploadresult', (req, res) => {
  const { title, pic } = req.body;

  // req.user.password = undefined
  if (pic) {
    const result = new Result({
      title,
      photo: pic,
    });
    result
      .save()
      .then((result) => {
        res.json({ notice: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
router.post('/uploadroutine', (req, res) => {
  const { title, pic } = req.body;

  // req.user.password = undefined
  if (pic) {
    const routine = new Routine({
      title,
      photo: pic,
    });
    routine
      .save()
      .then((routine) => {
        res.json(routine);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.get('/mypost', requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name pic')
    .populate('comments.postedBy', '_id name pic')
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((e) => console.log(e));
});

router.put('/like', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate('postedBy', '_id name pic')
    .populate('comments.postedBy', '_id name pic')

    .then((result) => res.json(result))
    .catch((e) => console.log(e));
});

router.put('/unlike', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate('postedBy', '_id name pic')
    .populate('comments.postedBy', '_id name pic')
    .then((result) => res.json(result))
    .catch((e) => console.log(e));
});
router.put('/comment', requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate('comments.postedBy', '_id name pic')
    .populate('postedBy', '_id name pic')
    .exec((err, result) => {
      if (err) {
        return res.json({ error: err });
      }
      // console.log(result)
      res.json(result);
    });
});

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;
