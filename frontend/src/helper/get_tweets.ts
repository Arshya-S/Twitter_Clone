import { TweetType } from "../App";

const getTweets = async (setTweets: (tweets: TweetType[]) => void) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/tweets', {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error('Response not ok')
    }

    const data: TweetType[] = await response.json();
    setTweets(data)

  } catch (err) {
    console.log('Fetch tweets error: ', err)
  }
}

export default getTweets