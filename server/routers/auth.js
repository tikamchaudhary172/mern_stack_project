const express = require('express');
const users = require('../models/userSchema.js');
const authenticate = require('../middleware/authenticate.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../db/connectDB.js');    // Database Connection

const router = express.Router();


//Home Route
router.get('/', (req, res) => {
  res.send('Hello Home word from server Auth.js')
});


// Registration Route

// //Using Promises
// router.post('/register', (req, res) => {
//   const { name, email, phone, work, password, conformPassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !conformPassword) {
//     return res.status(422).json({ Error: 'Plz fill the all fields ...' })
//   }
//   users.findOne({ email: email })
//     .then((result) => {
//       if (result) { return res.status(422).json({ Error: "Email Already Registered!" }) }
//       const newUser = new users({ name, email, phone, work, password, conformPassword })
//       newUser.save().then((addUser) => {
//         res.status(201).json({ Message: 'User Registered Successfully...', addUserDetail: addUser })
//       }).catch((error) => { res.status(500).json({ Error: 'User Registration Failed...' }) })
//     }).catch((error) => { console.log(error) })
// })


//Using Async-Await
router.post('/register', async (req, res) => {

  const { name, email, phone, work, password, conformPassword } = req.body;

  if (!name || !email || !phone || !work || !password || !conformPassword) {
    return res.status(422).json({ Error: 'Plz fill the all fields ...' })
  }

  try {
    const result = await users.findOne({ email: email });
    if (result) {
      return res.status(422).json({ Error: "Email Already Registered!" })
    } else if (password != conformPassword) {
      return res.status(422).json({ Error: "Password Are Not Matching!" })
    } else {
      const newUser = new users({ name, email, phone, work, password, conformPassword });
      //-- bcryptjs ---//
      const addUser = await newUser.save();
      res.status(201).json({ Message: 'User Registered Successfully...', addUserDetail: addUser })
    }

  } catch (error) {
    console.log(error)
  }
});

// Login Route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ Error: 'Plz filled the data ...' })
    }
    const userLogin = await users.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (isMatch) {

        const token = await userLogin.generateAuthToken();

        console.log(`Received token in auth.js :${token}`);

        res.cookie('jwtToken', token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        });

        res.status(201).json({ Message: 'User Signin Successfully ...' })
      } else {
        res.status(400).json({ Error: 'Invalid Details ...' })
      }
    } else {

      res.status(400).json({ Error: 'Not A Registered User ...' })
    }
  } catch (error) {
    console.log(error)
  }
})


// About Route
router.get('/about', authenticate, (req, res) => {
  console.log(`Hello My About`);
  res.send(req.rootUser);
})

// get user data for contact & home pages
router.get('/getData', authenticate, (req, res) => {
  console.log('get user data for contact & home pages');
  res.send(req.rootUser);
})

// Contact page Route
router.post('/contact', authenticate, async (req, res) => {
try {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message){
    console.log('error in contact form');
    return res.json({Error:"Plz fill the contact form ..."});
  }
  const userContact = await users.findOne({ _id: req.userID });
  if(userContact){

    const userMessage = await userContact.addMessage(name, email, phone, message);
    await userContact.save();
    res.status(201).json({Message:"User message sent successfully ..."});
  }
} catch (error) {
  console.log(error);
}
});


// Logout Route
router.get('/logout',  (req, res) => {
  console.log(`Hello My Logout Page`);
  res.clearCookie('jwtToken',{path:'/'});
  res.status(200).send('User Logout Successfully ...');
})

module.exports = router;