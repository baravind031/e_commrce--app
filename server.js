const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;


// you canuse your own database username and password, i did hear databse connection
mongoose.connect('mongodb+srv://admin:fcGJrtGnhRTes4ur>@cluster0.uejwn03.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

const User = mongoose.model('User', {
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const { username, password, firstName, lastName, phoneNumber, email } = req.body;

  const user = new User({
    username,
    password,
    firstName,
    lastName,
    phoneNumber,
    email,
  });

  user.save((err, newUser) => {
    if (err) {
      console.error('Error saving user:', err);
      res.status(500).send('Error saving user');
    } else {
      console.log('User saved:', newUser);
      res.status(200).send('User saved');
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) {
      console.error('Error finding user:', err);
      res.status(500).send('Error finding user');
    } else if (!user) {
      res.status(404).send('User not found');
    } else if (user.password !== password) {
      res.status(401).send('Incorrect password');
    } else {
      // Generate and return a JWT token
      const token = jwt.sign({ username }, 'ourSucess_56');
      res.status(200).json({ message: 'Login successful', token });
    }
  });
});

// Middleware function to verify the JWT token
function verifyToken(req, res, next) {
  // Get the auth header value
  const bearerHeader = req.headers.authorization;

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split the bearer token
    const bearer = bearerHeader.split(' ');

    // Get the token from array
    const bearerToken = bearer[1];

    // Set the token
    req.token = bearerToken;

    // Call the next middleware
    next();
  } else {
    // Forbidden error
    res.sendStatus(403);
  }
}

// Protected route
app.get('/protected', verifyToken, (req, res) => {
  // Middleware to verify token
  jwt.verify(req.token, 'ourSucess_56', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.status(200).json({ message: 'Protected data', authData });
    }
  });
});

// GET route to fetch all users
app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send('Error retrieving users');
    } else {
      console.log('Users retrieved:', users);
      res.status(200).json(users);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
