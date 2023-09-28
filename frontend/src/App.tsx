import './App.css'
import './index.css'

import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import getTweets from './helper/get_tweets'
import Login from './components/Login'
import Home from './components/Home'

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
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home setReRender={setReRender} reRender={reRender} tweets={tweets}/>}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
    
  )
  
}

export default App
