'use strict'

$( document ).ready(function() {

  loadTweets();

  function creatTweetElement(tweet){

    let tweetEl = `<article class='border'>
                  <header class="head">
                  <img class="userlogo" src=${tweet.user.avatars.small}></img>
                  <p class ='name'>${tweet.user.name}</p>
                  <p class='username'>${tweet.user.handle}</p>
                  </header>
                  <p class='tweets'>${tweet.content.text}</p>
                  <footer class="foot">
                  <p>${Math.round((Date.now()-tweet.created_at)/(100*60*60))} minutes ago<img class='hoverstate' src="pictures/flag.png"><img class='hoverstate' src="pictures/retweet.png"><img class='hoverstate' src="pictures/heart.png"></p>
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
  });

  for( let singleTweet of tweets){

    tweets[i] = creatTweetElement(singleTweet);
    i++;
  };

  $('.tweetFeed').prepend(tweets.join(''));
}


$(".textInTweet").submit(function(event){

  event.preventDefault();
  let tweetText = $( this ).serialize();


  if($("textarea").val() == undefined || $("textarea").val() == null || $("textarea").val().replace(/\s/g, '').length === 0 || $('.counter').html() == 140){
    $('.flashMsg').append('Please make sure your message has content! ');
    setTimeout(function(){$('.flashMsg').html('')} , 3000);

  }else if(  $('.counter').html() < 0 ){
    $('.flashMsg').append('Please make sure your message is shorter than 140 characters! ');
    setTimeout(function(){$('.flashMsg').html('')} , 3000);
  }else{

    $.ajax({
        method: 'POST',
        url: `/tweets`,
        data: tweetText,
        success: (response) => {
        loadTweets();
        },
        fail: console.log('err')
      });
   }
});
function loadTweets(){

  $.ajax({
    method:'GET',
    url:`/tweets`,
    success: (response)=>{
      renderTweets(response);
    } ,

    fail: console.log('err')
  })
}

  $('.compose').on('click',()=>{
    $('.new-tweet').slideToggle("fast",()=>{
      if($('.new-tweet').css('display') == 'block' ){
        $('textarea').focus();
    };
  });
  });
});
