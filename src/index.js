const express = require('express');
const connect = require('./config/database');

const app = express();

const {TweetRepository, HashtagRepository} = require('./repository/index');
const  TweetService = require('./services/tweet-service');
const TweetRepo = require('./repository/tweet-repository');
app.listen(3000, async() =>{
     console.log('Server Started');
     await connect();
     console.log('Mongo db connected');
     let repo = new TweetService();
     const tweet = await repo.create({
         content: 'is #working twitter ?',
     });
     console.log(tweet);
     
    
});