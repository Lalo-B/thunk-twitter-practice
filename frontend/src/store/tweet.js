// constant to avoid debugging typos
const GET_ALL_TWEETS = "tweet/getAllTweets";


// thunk action creator
export const getAllTweets = () => async (dispatch) => {
  // console.log("in thunk before fetch");

  const response = await fetch("/api/tweets");

  // console.log("in thunk after fetch", response);

  if (response.ok) {
    const data = await response.json();
    // console.log("in thunk res.ok, data from backend:", data);
    dispatch({
      type: GET_ALL_TWEETS,
      tweets: data,
    });
    return data;
  }
};

// regular action
const ADD_TWEET = "tweet/addTweet";
const addTweet = (tweet) => {
  return {
    type: ADD_TWEET,
    tweet,
  };
};

// thunk action creator
export const createTweet = (message) => async (dispatch) => {
  const response = await fetch(`/api/tweets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (response.ok) {
    const tweet = await response.json();
    dispatch(addTweet(tweet));
    return tweet;
  }
};

// state object
const initialState = {};

// reducer
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      // console.log("in tweet reducer");
      console.log(action.tweets)
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      // console.log("in tweet reducer; newState: ", newState);
      return newState;
    }
    case ADD_TWEET: {
      console.log('this is state in add tweet',state)
      const newState = { ...state };
      console.log('this is new state in add tweet',newState)
      newState[action.tweet.id] = action.tweet;
      return newState;
    }
    default:
      return state;
  }
};

export default tweetsReducer;
