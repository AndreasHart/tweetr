'use strict'





$( document ).ready(function() {
   function creatTweetElement(tweet){
  console.log('this:'+ tweet);
  let tweetEl = `<article>
                <header class="head">
                <img class="userlogo" src=${tweet.user.avatars.small}></img>
                <p class ='name'>${tweet.user.name}</p>
                <p class='username'>${tweet.user.handle}</p>
                </header>
                <p class='tweets'>${tweet.content.text}<p>
                <footer class="foot">
                <p>${new Date(tweet.created_at)}<img class='hoverstate' src="pictures/flag.png"><img class='hoverstate' src="pictures/retweet.png"><img class='hoverstate' src="pictures/heart.png"></p>
                </footer>
                </article>
                `

                return tweetEl;
 };

function renderTweets(tweets){
  let i = 0;
  $('.tweetFeed').html('');
  tweets.sort((a,b)=>{
    if(a.created_at > b.created_at){
      return -1;
    }
    if(a.created_at < b.created_at){
      return 1;
    }
      return 0;
  })
  for( let singleTweet of tweets){
    console.log('that:' + singleTweet);
    tweets[i] = creatTweetElement(singleTweet);
    i++;
  };
  //console.log($('.tweetFeed'));
  $('.tweetFeed').prepend(tweets.join(''));
}


$(".textInTweet").submit(function(event){

  event.preventDefault();
  let tweetText = $( this ).serialize();
  console.log($('.counter').html());
  if(  $('.counter').html() < 0 ){
    $('.flashMsg').append('Please make sure your message is shorter than 140 characters! ');
    setTimeout(function(){$('.flashMsg').html('')} , 3000);
  } else if( $('.counter').html() == 140  ){
    $('.flashMsg').append('Please make sure your message has content! ');
    setTimeout(function(){$('.flashMsg').html('')} , 3000);
  }else{
    console.log('happened');
    $.ajax({
        method: 'POST',
        url: `/tweets`,
        data: tweetText,
        success: (response) => {
        loadTweets(response);
        },
        fail: console.log('err')
      });
   }
});
function loadTweets(tweetText){


  $.ajax({
    method:'GET',
    url:`/tweets`,
    data:tweetText,
    success: (response)=>{
      renderTweets(response);
    } ,
    fail: console.log('fucked up brah')

  })
}

  $('.compose').on('click',()=>{
  console.log('forrealll');
  $('.new-tweet').slideToggle("fast",()=>{
    console.log('maybe');
    if($('.new-tweet').css('display') == 'block' ){
      console.log('probably');
      $('textarea').focus();
    };
  });

  });



});



/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

