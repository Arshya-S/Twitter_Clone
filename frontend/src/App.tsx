import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'



function App() {
  const [tweets, setTweets] = useState([]);

  const getTweets = () => {
    axios.get('http://127.0.0.1:8000/tweets')
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log('Get request error: ', err)
      })
  }

  useEffect(() => {
    const tweetList = getTweets()
    setTweets(tweetList)
  }, [])



  return (
    <>
      {tweets.map((tweet, index) =>{
        return <li>{tweet.content}</li>
      })}
    </>
  )
}

export default App
