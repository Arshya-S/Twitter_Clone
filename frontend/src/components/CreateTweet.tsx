import { useState } from "react"

const CreateTweet = () => {
  const [text, setText] = useState<string>('')

  const handleTextareaChange = (event:  React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(text)
    setText('')
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