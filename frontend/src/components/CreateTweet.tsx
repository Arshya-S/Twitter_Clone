import { useState } from "react"

const CreateTweet = () => {
  const [text, setText] = useState<string>('')

  const handleTextareaChange = (event:  React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    const tweetData: object = {
      content: text,
      likes: 0,
      is_retweet: false,
      parent: null
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tweets/create/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tweetData)
      })
      
      if (!response.ok) {
        throw new Error('Response not ok')
      }

      setText('')

    } catch (err) {
      console.log('Post tweets error: ', err)
    }

  };


  return (
    <form
      className="col-7 mx-auto d-flex flex-column align-items-end mt-5"
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