// Implementation of #AWSCertified Twitter bot
console.log("==== Welcome #AWSCertified Twitter Bot ====");

// Import dependencies
const Twit = require("twit");

const random = require("./utils/index");

// Configuration
const config = require("./config");
const TwitterBot = new Twit(config.twitterKeys);

// Query String parameters
const params = {
  q: config.query,
  result_type: config.result_type,
  lang: config.lang
};

// API

// ==== RETWEET ====
const retweet = () => {
  TwitterBot.get("search/tweets", params, (err, data) => {
    // when there no errors
    if (!err) {
      let retweetID = data.statuses[0].id_str;

      TwitterBot.post("statuses/retweet/:id", { id: retweetID }, (err, res) => {
        if (res) {
          console.log(`==== RETWEET SUCCESS: ${retweetID} ==== `);
        }
        if (err) {
          console.log(`====> ERROR in RETWEET: ${err} ====`);
        }
      });
    } else {
      console.log(`====> ERROR in RETWEET DATA: ${err} ==== `);
    }
  });
};

// Invoke API
retweet();
// every 30 minutes
setInterval(retweet, 1800000);

// ==== FAVORITE API ====

const favoriteTweet = () => {
  TwitterBot.get("search/tweets", params, (err, data) => {
    // when there no errors
    if (!err) {
      let tweet = data.statuses;

      let randomTweet = random(tweet);

      if (typeof randomTweet != "undefined") {
        TwitterBot.post(
          "favorites/create",
          { id: randomTweet.id_str },
          (err, response) => {
            if (response) {
              console.log(`==== FAVORITE SUCCESS: ${randomTweet.id_str} ==== `);
            }
            if (err) {
              console.log(`====> ERROR in FAVORITE: ${err} ====`);
            }
          }
        );
      }
    } else {
      console.log(`====> ERROR in FAVORITE DATA: ${err} ==== `);
    }
  });
};

// Invoke API
favoriteTweet();
// every 30 minutes
setInterval(favoriteTweet, 1800000);
