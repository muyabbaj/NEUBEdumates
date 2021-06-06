const router = require('express').Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
// const Question=mongoose.model("Question");
const Question = require('../models/question');

router.post('/postquestion', (req, res) => {
  const { department, subject, semester, ctname, questionLink } = req.body;

  if (!department || !subject || !semester || !ctname || !questionLink) {
    res.json({ error: 'Please fill all the field' });
  } else {
    const question = new Question({
      department,
      subject,
      semester,
      courseTeacherName: ctname,
      questionLink,
    });
    question
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((e) => console.log(e));
  }
});

router.get('/showquestion', requireLogin, (req, res) => {
  //    const dept=req.body.dept;
  //     console.log(dept)
  //     console.log("HI")
  //     //const dept="CSE";
  Question.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
