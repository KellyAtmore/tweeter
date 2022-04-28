$(document).ready(function() {

//hide error messages on page load
$(".error-message").hide();
$(".error-message2").hide();

  //function for cross site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //function for creating new tweet elements and populate using data obj
  const createTweetElement = function(data) {
    const $tweet = ` <article>
    <header class="tweet-header">
   <div class="align-left">
    <img src=${data.user.avatars}>
      <p class="name">${data.user.name}</p>
     </div>
      <p class="handle">${data.user.handle}</p>
    
    </header>
      <p class="tweet">${escape(data.content.text)}</p>
    <footer class="tweet-footer">
      <p class="tweet-stats">${timeago.format(new Date(data.created_at))}</p>
      <p class="tweet-stats"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
  </article>`;
    return $tweet;
  };
  
  //renders and appends a tweet to the beginning of the container
  const renderTweets = function(data) {
  
    for (const el of data) {
      const $newTweet = createTweetElement(el);
      $('.tweet-container').prepend($newTweet);
    }
  
  };
  
$("form").submit(function(event) {

    event.preventDefault();
    const data = $("#tweet-text").serialize();
    $(".error-message").slideUp().hide();  //both error messages are hidden at first
    $(".error-message2").slideUp().hide();
    
    if ($("#tweet-text").val() === "") {  //if the tweet is empty reveal error message
      
      $(".error-message").slideDown().show();
  
    } else if ($("#tweet-text").val().length > 140) {
      $(".error-message2").slideDown().show();
    } else {
      
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
      })
        .then(function(result)  {
          loadtweets();
          $('#tweet-text').val('');
          $('.counter').val('140');
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

