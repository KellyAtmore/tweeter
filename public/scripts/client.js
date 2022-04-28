$(document).ready(function() {

$(".error-message").hide();
$(".error-message2").hide();


  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(data) {
  
    const $tweet = ` <article>
    <header class="tweet-header">
      <p><img src=${data.user.avatars}>${data.user.name}</p>
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
    $(".error-message").slideUp().hide();
    $(".error-message2").slideUp().hide();
    
    if ($("#tweet-text").val() === "") {
      
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

