const router = require('express').Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
// const Library=mongoose.model("Library");
const Library = require('../models/library');

router.post('/postbook', (req, res) => {
  const { bookName, authorName, publisher, edition, department, bookLink } =
    req.body;

  if (
    !bookName ||
    !authorName ||
    !publisher ||
    !edition ||
    !department ||
    !bookLink
  ) {
    res.json({ error: 'Please fill all the field' });
  } else {
    const library = new Library({
      bookName,
      authorName,
      publisher,
      edition,
      department,
      bookLink,
    });
    library
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((e) => console.log(e));
  }
});

router.get('/showbook/:dept', requireLogin, (req, res) => {
  //    const dept=req.body.dept;
  //     console.log(dept)
  //     console.log("HI")
  //     //const dept="CSE";
  const { dept } = req.params;

  Library.find({ department: dept })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
