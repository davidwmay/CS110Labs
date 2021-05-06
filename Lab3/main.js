// specify a url, in this case our web server

const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"

let tweet_List = [];

function fetchTweets() {
    if (!(document.getElementById("pause").checked)) {
        fetch(url)
        .then(res => res.json()) .then(data => {  
        // do something with data
        // console.log(data)
        OUTER:
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < tweet_List.length; j++) {
                if (tweet_List[j].includes(data.statuses[i].id)) {
                    // console.log(data.statuses[i].id)
                    continue OUTER;
                }
            }
            var tweetInfo = [];
            tweetInfo.push(data.statuses[i].id);
            tweetInfo.push(data.statuses[i].text);
            tweetInfo.push(data.statuses[i].created_at);
            tweetInfo.push(data.statuses[i].user.name);
            tweetInfo.push(data.statuses[i].user.profile_image_url_https);
            tweet_List.push(tweetInfo);
        }
        console.log(tweet_List);
        })
        .catch(err => {
            // error catching
        console.log(err) }) 
    }

    // for (tweetInfo in tweet_List) {
    //     console.log(tweetInfo[1]);
    //     document.getElementById("tweet_text").innerHTML = tweetInfo[1];
    // }
}

// let searchString = "" // here we use a global variable

// const handleSearch = event => {
//     searchString = event.target.value.trim().toLowerCase()
//     // you may want to update the displayed HTML here too

// }
// document.getElementById("searchBar").addEventListener("input", handleSearch)



function getTweets() {
    fetchTweets();
    var intervalID = setInterval(fetchTweets, 5000);
}

const tweetContainer = document.getElementById('tweet-container');

/**
 * Removes all existing tweets from tweetList and then append all tweets back in
 *
 * @param {Array<Object>} tweets - A list of tweets
 * @returns None, the tweets will be renewed
 */
function refreshTweets(tweets) {
    // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
    // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
    }

    // create an unordered list to hold the tweets
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
    const tweetList = document.createElement("ul");
    // append the tweetList to the tweetContainer
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
    tweetContainer.appendChild(tweetList);

    // all tweet objects (no duplicates) stored in tweets variable

    // filter on search text
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
    // const filteredResult = tweets.filter(...);
    // sort by date
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    // const sortedResult = filteredResult.sort(...);

    // execute the arrow function for each tweet
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
    sortedResult.forEach(tweetObject => {
        // create a container for individual tweet
        const tweet = document.createElement("li");

        // e.g. create a div holding tweet content
        const tweetContent = document.createElement("div");
        // create a text node "safely" with HTML characters escaped
        // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
        const tweetText = document.createTextNode(tweetObject.text);
        // append the text node to the div
        tweetContent.appendChild(tweetText);

        // you may want to put more stuff here like time, username...
        tweet.appendChild(tweetContent);

        // finally append your tweet into the tweet list
        tweetList.appendChild(tweet);
    });
}