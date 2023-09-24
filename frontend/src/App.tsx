import './App.css'
import './index.css'


import TweetList from './components/TweetsList'
import CreateTweet from './components/CreateTweet'




function App() {
  return (
    <div>
      <CreateTweet />
      <TweetList />
    </div>
  )
}

export default App
