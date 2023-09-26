import { TweetType } from "../App"
import Tweet from "./Tweet"

const TweetList: React.FC<{ tweets: TweetType[], setReRender: (reRender: number) => void, reRender: number }> = ( {tweets, setReRender, reRender}) => {

  return (
    <div className='container'>
      {tweets.map((tweet, index) => {
        return <Tweet key={index} tweet={tweet} setReRender={setReRender} reRender={reRender}/>
      })}
    </div>
  )

}

export default TweetList