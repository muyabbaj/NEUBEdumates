const router = require('express').Router();
const mongoose = require('mongoose');
// const Class = mongoose.model('Class');
// const User=mongoose.model("User")
// const Classpost = mongoose.model('Classpost');
const requireLogin = require('../middleware/requireLogin');
const User = require('../models/user');
const Classpost = require('../models/classpost');
const Class = require('../models/class');

router.post('/createclass', requireLogin, (req, res) => {
  const { title, courseCode, section, semester, deptName } = req.body;

  if (!title | !courseCode | !section | !semester) {
    res.json({ error: 'Please fill up the all field' });
  } else {
    User.findOne({ isTeacher: true })
      .then((teacher) => {
        if (teacher) {
          const classes = new Class({
            title,
            courseCode,
            section,
            semester,
            department: deptName,
            createdBy: req.user,
          });
          classes
            .save()
            .then((data) => {
              res.json(data);
            })
            .catch((e) => console.log(e));
        } else {
          res.json({ error: 'You are not eligible' });
        }
      })
      .catch((e) => console.log(e));
  }
});

router.get('/showclasses/:deptName', (req, res) => {
  const { deptName } = req.params;

  Class.find({ department: deptName })
    .populate('createdBy', '_id name pic')
    .then((classes) => {
      res.json(classes);
    })
    .catch((e) => console.log(e));
});

router.get('/course/:courseId', requireLogin, (req, res) => {
  const { courseId } = req.params;
  // console.log(courseId)
  Class.findOne({ _id: courseId })
    .populate('createdBy', '_id name pic')
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
});
router.post('/classpost', requireLogin, (req, res) => {
  const { post, courseId } = req.body;

  if (post) {
    const classPost = new Classpost({
      posts: post,
      createdBy: req.user,
      courseId,
    });

    classPost
      .save()

      .then((result) => res.json(result))
      .catch((e) => console.log(e));
  } else {
    res.json({ error: 'Please write something...' });
  }
});
router.get('/showclasspost/:courseId', (req, res) => {
  const { courseId } = req.params;
  //console.log(courseId)
  Classpost.find({ courseId: courseId })
    .populate('createdBy', 'name pic')
    .populate('comments.commentsBy', '_id name pic')
    .populate('postedBy', '_id name pic')
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
});

router.put('/classcomment', requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    commentsBy: req.user._id,
  };

  Classpost.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate('comments.commentsBy', '_id name pic')
    .populate('createdBy', '_id name pic')

    .exec((err, result) => {
      if (err) {
        return res.json({ error: err });
      }
      // console.log(result)
      res.json(result);
    });
});
module.exports = router;
