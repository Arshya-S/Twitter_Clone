const postTweet = async (tweetData: object, setText: (text: string) => void, setReRender: (reRender: number) => void, reRender: number) => {
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

    if (reRender === 1) {
      setReRender(0)
    } else {
      setReRender(1)
    }

  } catch (err) {
    console.log('Post tweets error: ', err)
  }
}


export default postTweet