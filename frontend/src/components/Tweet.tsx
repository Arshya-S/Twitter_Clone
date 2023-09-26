import { useState } from "react"
import { TweetType } from "../App"

import likeTweet from "../helper/like_tweet"
import unlikeTweet from "../helper/unlike_tweet"


const Tweet: React.FC<{ tweet: TweetType, setReRender: (reRender: number) => void, reRender: number}> = ({tweet, setReRender, reRender}) => {

  const [liked, setliked] = useState<boolean>(false)
  // const [likes, setLikes] = useState<number>(tweet.likes)

  const colorFilled: string = 'btn-primary'
  const colorEmpty: string = 'btn-outline-primary'
  const color: string = liked ? colorFilled : colorEmpty
  
  return(
    <div className="col-7 mx-auto p-3 mt-4 border border-2">
      <p className='ms-2 fw-normal'>{tweet.content}</p>
      <div className='row align-items-center'>
        <button className={`ms-3 col-2 btn ${color} btn-sm`} onClick={() => {
          if (liked) {
            // setLikes(likes - 1)
            unlikeTweet(tweet.id, setReRender, reRender)
          } else {
            likeTweet(tweet.id, setReRender, reRender)
            // setLikes(likes + 1)
          }
          setliked(!liked)
        }}>Like {tweet.likes}</button> 
        <button className="ms-3 col-2 btn btn-outline-secondary btn-sm">Retweet</button> 
      </div>
    </div> 
  )
}

export default Tweet