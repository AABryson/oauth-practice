const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const {OAuth2Client} = require('google-auth-library');
const userRoutes = require('./routes/rusers.js')
// const authRouter = require('./routes/oauth')
// const requestRouter = require('./routes/request')

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://oauth-practice-frontend.vercel.app/'); // Replace with your frontend domain
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'hhttps://oauth-practice-frontend.vercel.app/'); // Replace with your frontend domain
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.sendStatus(204); // Send no content for OPTIONS requests
});
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("tiny"));


const oAuth2Client = new OAuth2Client(
    CLIENT_ID = '317428792953-lhgk1b018qbomhpfq4cbmu1u7aaujiv1.apps.googleusercontent.com',
    CLIENT_SECRET = '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',
    'postmessage',
);

app.post('/auth/google', async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  console.log(tokens);
  
  res.json(tokens);
});

app.post('/auth/google/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
})


app.use('/users', userRoutes)








module.exports = app;

