const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Tweet cannot be more than 250 characters']   
    },
    /*
    userEmail: {
        type: String
    },
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
        }
    ]
    */
    hashtags: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Hashtag'
        }
    ]

},{timestamps: true});

/*
tweetSchema.virtual('contentWithEmail').get(function process(){
    return `${this.content} \n Created by: ${this.userEmail}`;
})

tweetSchema.pre('save', function(next){
    console.log('Inside a hook');
    this.content = this.content + '....';
    next();
})
*/
const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;