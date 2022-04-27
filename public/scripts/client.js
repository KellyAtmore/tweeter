/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

//console.log(data[0].user.name);

$(document).ready(function() {

  const createTweetElement = function(data) {
    const $tweet = ` <article>
    <header class="tweet-header">
      
      <p><img src=${data.user.avatars}>${data.user.name}</p>
      
      <p class="handle">${data.user.handle}</p>
    </header>
  
    <p class="tweet">${data.content.text}</p>
    <footer class="tweet-footer">
      <p class="tweet-stats">${data.created_at}</p>
      <p class="tweet-stats"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
  </article>`;
    return $tweet;
  };
  
  const renderTweets = function(data) {
  
    for (const el of data) {
  
      const $newTweet = createTweetElement(el);
      $('.tweet-container').append($newTweet);
    }
  
  };
  renderTweets(data);
});

