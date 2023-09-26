import { useState } from "react"
import postTweet from "../helper/post_tweet";

interface CreateTweetProps {
  setReRender: (value: number) => void;
  reRender: number
}

const CreateTweet: React.FC<CreateTweetProps> = ({ setReRender, reRender}) => {
  const [text, setText] = useState<string>('')

  const handleTextareaChange = (event:  React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    const tweetData: object = {
      content: text
    }
    postTweet(tweetData, setText, setReRender, reRender)
  };


  return (
    <form
      className="col-5 mx-auto d-flex flex-column align-items-end mt-5"
      onSubmit={handleSubmit}
    >
      <textarea
        value={text}
        onChange={handleTextareaChange}
        className="form-control"
        placeholder="Enter your tweet here"
      ></textarea>
      <button type="submit" className="btn btn-primary btn-sm mt-1 mb-3">Tweet</button>
    </form>
  )
}


export default CreateTweet