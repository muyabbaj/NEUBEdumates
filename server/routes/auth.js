const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
// const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user');
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
    },
  })
);

router.post('/signup', (req, res) => {
  const { name, email, studentid, gender, department, session, password } =
    req.body;
  if (!name || !email || !gender || !department || !password) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'User already exists with that email' });
      }

      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          console.log(err);
        }
        const token = buffer.toString('hex');
        bcrypt.hash(password, 12).then((hashedpassword) => {
          const user = new User({
            name,
            email,
            studentid,
            gender,
            department,
            session,
            password: hashedpassword,
          });
          user.activeToken = token;
          user
            .save()
            .then((user) => {
              transporter.sendMail({
                to: email,
                from: 'muyabbaj.neub@gmail.com',
                subject: 'Account Activation',
                html: `
                                <h5>Click in this <a href="http://localhost:3000/active/${token}">link</a> to active account(Within One Hour)</h5>
                                `,
              });
              res.json({
                message: 'Please check email and active your account',
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/active-account', (req, res) => {
  const { activeToken } = req.body;

  User.findOne({ activeToken: activeToken })
    .then((user) => {
      user.isVerified = true;
      user.activeToken = undefined;
      user.save().then((confirm) => {
        res.json({ message: 'Account successfully active' });
      });
    })
    .catch((e) => console.log(e));
});

router.post('/access', (req, res) => {
  const { email, active } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      user.isTeacher = active;
      user.save().then((confirm) => {
        res.json({ message: 'Now you can create Class Room' });
      });
    })
    .catch((e) => console.log(e));
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: 'please add email or password' });
  }

  User.findOne({ email: email, isVerified: true }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: 'Please Verify Your Account' });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //   transporter.sendMail({
          //     to: savedUser.email,
          //     from: 'muyabbaj.neub@gmail.com',
          //     subject: 'Signin Alert',
          //     html: `Hello, ${savedUser.name}. Thanks for signin NEUBEdumates `,
          //   });

          const token = jwt.sign({ _id: savedUser._id }, 'SECRET');
          const { _id, name, email, followers, following } = savedUser;
          res.json({
            token,
            user: {
              _id,
              name,
              email,
              followers,
              following,
            },
          });
        } else {
          return res.status(422).json({ error: 'Invalid Email or password' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post('/reset-password', (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: 'User dont exists with that email' });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: 'muyabbaj.neub@gmail.com',
          subject: 'password reset',
          html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/resetpassword/${token}">link</a> to reset password</h5>
                    `,
        });
        res.json({ message: 'Check your email' });
      });
    });
  });
});
router.post('/new-password', (req, res) => {
  const { newpassword, token } = req.body;
  //console.log(newpassword, token);
  User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.json({ error: 'Session Expired' });
      }
      bcrypt
        .hash(newpassword, 12)
        .then((hashedpassword) => {
          user.password = hashedpassword;
          user.resetToken = undefined;
          user.expireToken = undefined;
          user.save().then((savePassword) => {
            res.json({ message: 'Password successfully update' });
          });
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
});

module.exports = router;
