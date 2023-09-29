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

  const [user, setUser] = useState<string | null>(localStorage.getItem('username') ?  localStorage.getItem('username'): null);
  
  useEffect(() => {
    getTweets(setTweets);
  }, [reRender])

  return (
    <BrowserRouter>
      <Navbar user={user} setReRender={setReRender} reRender={reRender}/>
      <Routes>
        <Route path='/tweets' element={<Home setReRender={setReRender} reRender={reRender} tweets={tweets}/>}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
      </Routes>
    </BrowserRouter>
    
  )
  
}

export default App
