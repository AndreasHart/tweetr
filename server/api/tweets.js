"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();


module.exports = function(db) {

  tweets.get("/", function(req, res) {
    console.log("tweets get /");
    let tweets = db.getTweets( data => {
      console.log("i don't know",data);
      return res.json(data);

    })
  });

  tweets.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }
    //console.log(req);
    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    db.saveTweet(tweet);
    return res.send();
  });

  return tweets;

}
