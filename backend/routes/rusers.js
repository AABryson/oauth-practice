const Users = require('../models/musers.js');
const db = require('../db.js')
const express = require('express');
const axios = require('axios');
const queryString = require('querystring');
let router = express.Router()

router.post('/signup', async (req, res, next) => {
    try {
        // let {username, password, email} = req.body
        let user = await Users.addUser(req.body)
        res.status(201).json({user})
    } catch(err) {
        return next(err)
    }
})

router.post('/login', async (req, res, next) => {
    
        const {username, password} = req.body;
        console.log('is username and password in req.boy', req.body)
        if (!password) {
            return res.status(400).send({error: 'Password is required'})
        }

        let user = await Users.userLogin(username, password)
        res.status(201).json({user})
    }
        // started here for getting token
        // const clientId = '317428792953-1qisisl9mi6v6o199gjirkiuagl983hq.apps.googleusercontent.com';
        // const clientSecret = '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';
        // const redirectUri = 'http://127.0.0.1:5173/oauth2callback';
        // const scope = 'https://www.googleapis.com/auth/books';
        // const authUrl = 'https://accounts.google.com/o/oauth2/auth';
        // const tokenUrl = 'https://oauth2.googleapis.com/token';

        // const authorizationUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
        // // window.location.href = authorizationUrl;
        // console.log('authoirzation url', authorizationUrl)
                
        // const response = await axios.post(tokenUrl, queryString.stringify({
        //             code,
        //             client_id: clientId,
        //             client_secret: clientSecret,
        //             redirect_uri: redirectUri,
        //             grant_type: 'authorization_code',
        //         }), {
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded',
        //             },
        //         });

        // res.json({response})
        //         console.log('Access Token:', access_token);
               
           


)      

module.exports = router

// router.post('./login', (req, res, next){
//     let {usernme, email} = req.body
//     let user =
// })