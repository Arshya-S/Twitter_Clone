import { TweetType } from "../App"
import Tweet from "./Tweet"

const TweetList: React.FC<{ tweets: TweetType[] }> = ( {tweets}) => {

  return (
    <div className='container'>
      {tweets.map((tweet, index) => {
        return <Tweet key={index} tweet={tweet}/>
      })}
    </div>
  )

}

export default TweetList