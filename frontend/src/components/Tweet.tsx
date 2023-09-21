import { TweetType } from '../App'


interface TweetProps {
  tweet: TweetType
}

const Tweet = ({tweet}: TweetProps) => {
//  col-10 mx-auto col-md-6 my-5 py-5 border bg-white text-dark
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