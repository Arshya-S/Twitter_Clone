const CreateTweet = () => {
  return(
    <form className="col-7 mx-auto d-flex flex-column align-items-end mt-5" action="" onSubmit={(event) => {
      event.preventDefault()
      console.log(event)
    }}>
        <textarea name='tweet' className="form-control"></textarea>
        <button type="submit" className="btn btn-primary btn-sm mt-1 mb-3">Tweet</button>
    </form>
  )



}


export default CreateTweet