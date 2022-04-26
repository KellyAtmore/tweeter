$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    //let max = 140;
    let len = $(this).val().length;
    let $count =  $(this).parent().find(".counter");
    let remainingChar = (140 - len);
    $count.text(remainingChar);
    
    if (remainingChar < 0) {
      $count.css("color", "red");
    } else {
      $count.css("color", "");
    }
   
  });
});