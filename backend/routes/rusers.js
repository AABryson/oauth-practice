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
        


)      

module.exports = router

