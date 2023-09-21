import { TweetType } from '../App'


interface TweetProps {
  tweet: TweetType
}

const Tweet = ({tweet}: TweetProps) => {
//  col-10 mx-auto col-md-6 my-5 py-5 border bg-white text-dark
  return(
    <div className="tweet_container container p-3 mt-3 border border-2 bg-white text-dark">
      <p className='fw-normal'>{tweet.content}</p>
      <div className='row align-items-center'>
        <button className="tweet_button col-1 btn btn-primary btn-sm">Like {tweet.likes}</button> 
      </div>
    </div>


  )
}

export default Tweet