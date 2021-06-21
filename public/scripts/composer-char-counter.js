$(document).ready(function() {
  console.log("ready");
  let negativeCount;
  let charCount;
  $( "#tweet-text" ).keyup(function() {
    $("#error-message").html(""); //Clear the error message div
    const chars = $(this).val(); //Capture the characters from the text area
    //Update the counter, if the character count is over 140, change the colour to red and count backwards
    if (chars.length === 141) {
      $('#current-count').css('color','red');
      $('#current-count').html('-1');  
    }
    //Capture each character entered and increment the letter count for the tweet
    if (chars.length < 141) {
      charCount = Number($('#current-count').html());
      $('#current-count').css('color','black');
      $('#current-count').html(String(charCount - 1));  
    } else if (chars.length > 141) {
      negativeCount = Number($('#current-count').html());
      $('#current-count').css('color','red');
      $('#current-count').html(String(negativeCount - 1));  
    }
  });
});

