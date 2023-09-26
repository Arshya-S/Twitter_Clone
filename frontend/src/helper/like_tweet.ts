const likeTweet = async (id: number, setReRender: (reRender: number) => void, reRender: number) => {

  const data = {
    id: id,
    action: 'like'
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/tweets/action/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Response not ok')
    }

    if (reRender === 1) {
      setReRender(0)
    } else {
      setReRender(1)
    }

    
  } catch (err) {
    console.log('Like tweet error: ', err)
  }

}

export default likeTweet