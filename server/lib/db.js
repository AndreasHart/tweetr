"use strict";


const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweetr";
const assert = require('assert');






module.exports = {
  connect: (onConnect) => {
    MongoClient.connect(MONGODB_URI, (err, db) => {
      if (err) {
        console.log('Could not connect! Unexpected error. Details below.');
        throw err;
      }
      const dbMethods = {
        saveTweet: (data) => {
          db.collection('tweets').insert(data);
          return true;
        },
        getTweets: (callback) => {
          if(err){
            console.log(err);
          }
          return db.collection('tweets').find().toArray((err,documents)=>{
              callback(documents);
          })
        }
      }
    onConnect(dbMethods);
    });
  }
};
