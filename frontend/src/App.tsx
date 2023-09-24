import './App.css'
import './index.css'

import TweetList from './components/TweetsList'
import CreateTweet from './components/CreateTweet'
import { useState, useEffect } from 'react'


export interface TweetType {
  id: number,
  content: string,
  likes: number,
  is_retweet: boolean,
  parent: object | null
}



function App() {
  
  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
    
    const getTweets = async () => {
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

    getTweets();
  }, [])

  return (
    <div>
      <CreateTweet />
      <TweetList tweets={tweets}/>
    </div>
  )
}

export default App
