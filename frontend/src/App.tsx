import './App.css'
import './index.css'

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import getTweets from './helper/get_tweets'

import Login from './components/Login'
import Home from './components/Home'
import Navbar from './components/Navbar'

export interface TweetType {
  id: number,
  content: string,
  likes: number,
  is_retweet: boolean,
  parent: object | null
}

function App() {
  
  const [tweets, setTweets] = useState<TweetType[]>([])
  const [reRender, setReRender] = useState<number>(0)
  const [authTokens, setAuthTokens] = useState<string>('')
  const [user, setUser] = useState<string>('')
  

  

  useEffect(() => {
    getTweets(setTweets);
  }, [reRender])

  
  return (
    <BrowserRouter>
      <Navbar user={user}/>
      <Routes>
        <Route path='/' element={<Home setReRender={setReRender} reRender={reRender} tweets={tweets}/>}/>
        <Route path='/login' element={<Login setAuthTokens={setAuthTokens} setUser={setUser}/>}/>
      </Routes>
    </BrowserRouter>
    
  )
  
}

export default App
