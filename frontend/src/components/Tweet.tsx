import { TweetType } from '../App'

interface TweetProps {
  tweet: TweetType
}

const Tweet = ({tweet}: TweetProps) => {

  return(
    <div className="col-10 mx-auto col-md-6 my-5 py-5 border bg-white text-dark">
      <p>{tweet.content}</p>
      <button className="btn btn-primary btn-sm">Like</button>
    </div>


  )
}

export default Tweet