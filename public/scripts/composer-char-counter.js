$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let max = 140;
    let len = $(this).val().length;
    let count = max - len;
    
    if (count <= 0) {
      $(".counter").addClass("red-limit");
    }
    if (count > 0) {
      $(".counter").removeClass("red-limit");
    }
    $(".counter").text(count);
  });
});