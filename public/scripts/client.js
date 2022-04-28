




$(document).ready(function() {

  
  
  const createTweetElement = function(data) {
    const $tweet = ` <article>
    <header class="tweet-header">
      
      <p><img src=${data.user.avatars}>${data.user.name}</p>
      
      <p class="handle">${data.user.handle}</p>
    </header>
  
    <p class="tweet">${data.content.text}</p>
    <footer class="tweet-footer">
      <p class="tweet-stats">${timeago.format(new Date())}</p>
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
  //renderTweets(data);


$("form").submit(function(event) {

    event.preventDefault();
    const data = $("#tweet-text").serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: data,
    })
      .then(function(result)  {
        loadtweets();
        location.reload();
      });
    
  });

  const loadtweets = function() {
    
    $.ajax({
      type: "GET",
      url: "/tweets",
    })
      .then(function(data) {
        
        const reverseData = data.reverse();
        renderTweets(reverseData);
      });
  };

  loadtweets();

});

