import { TweetType } from "./TweetsList"


const Tweet: React.FC<{ tweet: TweetType}> = ({tweet}) => {
  return(
    <div className="col-7 mx-auto p-3 mt-4 border border-2">
      <p className='ms-2 fw-normal'>{tweet.content}</p>
      <div className='row align-items-center'>
        <button className="ms-3 col-2 btn btn-outline-primary btn-sm">Like {tweet.likes}</button> 
        <button className="ms-3 col-2 btn btn-outline-secondary btn-sm">Retweet</button> 
      </div>
    </div>


  )
}

export default Tweet