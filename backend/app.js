// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const app = express();
// const {OAuth2Client} = require('google-auth-library');
// const userRoutes = require('./routes/rusers.js')

// const allowedOrigins = ['https://oauth-practice-frontend.vercel.app'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,POST,PUT,DELETE,OPTIONS',
//   allowedHeaders: 'Content-Type,Authorization'
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 
// app.use(morgan("tiny"));


// const oAuth2Client = new OAuth2Client(
//     CLIENT_ID = '317428792953-lhgk1b018qbomhpfq4cbmu1u7aaujiv1.apps.googleusercontent.com',
//     CLIENT_SECRET = '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',
//     'postmessage',
// );
// app.options('*', cors(corsOptions))

// // app.post('/auth/google', async (req, res) => {
// //   const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
// //   console.log(tokens);
  
// //   res.json(tokens);
// // });

// app.post('/auth/google', async (req, res) => {
//   try {
//     const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
//     console.log(tokens);
//     res.json(tokens);
//   } catch (error) {
//     console.error('Error in /auth/google:', error); // Added error handling
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // app.post('/auth/google/refresh-token', async (req, res) => {
// //   const user = new UserRefreshClient(
// //     clientId,
// //     clientSecret,
// //     req.body.refreshToken,
// //   );
// //   const { credentials } = await user.refreshAccessToken(); // optain new tokens
// //   res.json(credentials);
// // })
// app.post('/auth/google/refresh-token', async (req, res) => {
//   try {
//     const user = new UserRefreshClient(
//       CLIENT_ID,
//       CLIENT_SECRET,
//       req.body.refreshToken
//     );
//     const { credentials } = await user.refreshAccessToken(); // obtain new tokens
//     res.json(credentials);
//   } catch (error) {
//     console.error('Error in /auth/google/refresh-token:', error); // Added error handling
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.use('/users', userRoutes)








// module.exports = app;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { OAuth2Client } = require('google-auth-library');
const userRoutes = require('./routes/rusers.js');

const app = express();

// Define allowed origins
const allowedOrigins = ['https://oauth-practice-frontend.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Enable credentials if needed
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://oauth-practice-frontend.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No Content
});

// Log request details for debugging
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Google OAuth2Client setup
const oAuth2Client = new OAuth2Client(
  '317428792953-lhgk1b018qbomhpfq4cbmu1u7aaujiv1.apps.googleusercontent.com',
  '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',
  'postmessage'
);

app.post('/auth/google', async (req, res) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    console.log(tokens);
    res.json(tokens);
  } catch (error) {
    console.error('Error in /auth/google:', error); // Added error handling
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/auth/google/refresh-token', async (req, res) => {
  try {
    const user = new OAuth2Client(
      '317428792953-lhgk1b018qbomhpfq4cbmu1u7aaujiv1.apps.googleusercontent.com',
      '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',
      req.body.refreshToken
    );
    const { credentials } = await user.refreshAccessToken(); // obtain new tokens
    res.json(credentials);
  } catch (error) {
    console.error('Error in /auth/google/refresh-token:', error); // Added error handling
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/users', userRoutes);

module.exports = app;
