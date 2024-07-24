// const express = require('express');
// const {OAuth2Client} = require('google-auth-library');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(express.json());

// const oAuth2Client = new OAuth2Client(
//     CLIENT_ID = '317428792953-lhgk1b018qbomhpfq4cbmu1u7aaujiv1.apps.googleusercontent.com',
//     CLIENT_SECRET = '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',
//     'postmessage',
// );


// app.post('/auth/google', async (req, res) => {
//   const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
//   console.log('oauth.js backend token', tokens);
  
//   res.json(tokens);
// });

// app.post('/auth/google/refresh-token', async (req, res) => {
//   const user = new UserRefreshClient(
//     clientId,
//     clientSecret,
//     req.body.refreshToken,
//   );
//   const { credentials } = await user.refreshAccessToken(); // obtain new tokens
//   res.json(credentials);
// })

// module.exports = oAuth2Client