




$(document).ready(function() {
  const createTweetElement = function(data) {
    
    const $tweet = ` <article>
    <header class="tweet-header">
      <p><img src=${data.user.avatars}>${data.user.name}</p>
      <p class="handle">${data.user.handle}</p>
    </header>
      <p class="tweet">${data.content.text}</p>
    <footer class="tweet-footer">
      <p class="tweet-stats">${timeago.format(1473245023718)}</p>
      <p class="tweet-stats"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
  </article>`;
    return $tweet;
  };
  
  const renderTweets = function(data) {
  
    for (const el of data) {
  
      const $newTweet = createTweetElement(el);
      $('.tweet-container').prepend($newTweet);
    }
  
  };
  //renderTweets(data);


$("form").submit(function(event) {

    event.preventDefault();
    const data = $("#tweet-text").serialize();
    
    if ($("#tweet-text").val() === "") {
      alert("Cannot post an empty tweet");
    } else if ($("#tweet-text").val().length > 140) {
      alert("You tweet is too long!");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
      })
        .then(function(result)  {
          loadtweets();
      
        });
    }
    event.preventDefault();
  });

  const loadtweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
    })
      .then(function(data) {
        renderTweets(data);
      });
  };
  loadtweets();

});

