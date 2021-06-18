const timeago = window.timeago; //Get a handle to the timeago object

//Escape the characters entered in the text area
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Create the tweet with the data from /tweets (JSON)
const createTweetElement = function (tweet) {
  const userName = tweet.user["name"];
  const handle = tweet.user["handle"];
  const content = escape(tweet.content["text"]);
  const paragraphID = "tweet-paragraph";
  const tweetUserClass = "tweet-user";
  const tweetIconsClass = "tweet-icons";
  const created = tweet["created_at"];
  console.log(created);
  const timeStamp = timeago.format(created);
  const $tweet = $(
    `<article>
      <h3>
        <div class=${tweetUserClass}>
          <span>${userName}</span>
          <span>${handle}</span>
        </div>
      </h3>
      <p id=${paragraphID}>${content}</p>
      </hr>
      <div>
        <time>${timeStamp}</time>
        <div class=${tweetIconsClass}>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>

      </article>`
  );
  return $tweet;
};

//Render the tweets on the page within the "section-article" section
const renderTweets = function (tweets) {
  //Iterate through JSON objects and create tweets for each one
  $("#section-article").html("");
  for (const tweet in tweets) {
    //Create an article element for each tweet
    const $tweetElement = createTweetElement(tweets[tweet]);
    $("#section-article").prepend($tweetElement);
  }
};

$(document).ready(function () {

  //Load the existing tweets for the page
  const loadTweets = function(){

    //Get the existing tweets from the JSON tweet "database"
    $.ajax("/tweets/",{
      data: JSON,
      method: "GET"
    }).then((result) => {  
      renderTweets(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  //Load the existing tweets
  loadTweets();

  $("#tweet-submit").click(function(event) {
    $("#error-message").html(""); //Clear the error message div
    
  });

  //Submit event for the form
  $("#tweet-submit").submit(function(event) {
 
    $("#error-message").html(""); //Clear the error message div
    $('#current-count').html("140"); 

    event.preventDefault();
    const queryString = $(this).serialize();
    const formValues = $(this).serializeArray();
    const textAreaString = formValues[0]["value"];

    $("#tweet-text").val('');

    //Validate the tweet submitted - if it is under 140 characters and is not falsy, add the tweet
    if (textAreaString && textAreaString.length < 140) {
      $.ajax("/tweets/",{
        data: queryString,
        method: "POST"
      }).then((result) => {
        $("#error-message").html("");
        loadTweets();
      })
      .catch(err => {
        console.log(err);
      }); 
      
    } else {

      //If the text is an invalid length or is falsy, display an error message within the "error-message" div element for the page
      if(textAreaString.length > 140) {
        const $errMessageTooLong = $(
          `<span color="red">
            <i class="fas fa-exclamation-triangle" color="red"></i>
              Tweet is too long, please limit to 140 characters.
            <i class="fas fa-exclamation-triangle" color="red"></i>
          </span>`
        );
        $("#error-message").html($errMessageTooLong);
      }
    }
    
  });

});
