import './App.css'
import './index.css'

import TweetList from './components/TweetsList'
import CreateTweet from './components/CreateTweet'
import { useState, useEffect } from 'react'

import getTweets from './helper/get_tweets'

export interface TweetType {
  id: number,
  content: string,
  likes: number,
  is_retweet: boolean,
  parent: object | null
}

function App() {
  
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [reRender, setReRender] = useState<number>(0)

  useEffect(() => {
    getTweets(setTweets);
  }, [reRender])

  return (
    <div>
      <CreateTweet reRender={reRender} setReRender={setReRender}/>
      <TweetList tweets={tweets} reRender={reRender} setReRender={setReRender}/>
    </div>
  )
}

export default App
