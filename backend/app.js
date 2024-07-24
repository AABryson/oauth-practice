const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const {OAuth2Client} = require('google-auth-library');
const userRoutes = require('./routes/rusers.js')
// const authRouter = require('./routes/oauth')
// const requestRouter = require('./routes/request')

app.use(cors());
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
// app.use('/oauth', authRouter);
// app.use('/request', requestRouter);







module.exports = app;

/** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//   return next(new NotFoundError());
// });
/** Generic error handler; anything unhandled goes here. */
// app.use(function (err, req, res, next) {nopd
//   return res.status(status).json({
//     error: { message, status },
//   });
// });
