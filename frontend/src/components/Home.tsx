import { TweetType } from "../App"
import CreateTweet from "./CreateTweet"
import TweetList from "./TweetsList"

const Home: React.FC<{ setReRender: (value: number) => void, reRender: number, tweets:TweetType[]}> = ({setReRender, reRender, tweets }) => {
  return (
    <>
      <CreateTweet setReRender={setReRender} reRender={reRender}/>
      <TweetList tweets={tweets} setReRender={setReRender} reRender={reRender}/>
    </>
  )
}

export default Home