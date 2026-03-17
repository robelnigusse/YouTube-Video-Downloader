import axios from 'axios'

function App() {
  function getvideos(){
    axios.get('http://localhost:8000/?url=https://www.youtube.com/watch?v=jd7SqWrCIsg').then((res)=>{
      console.log(res.data)
    })
  }
  return (
    <button onClick={getvideos} >
      Get Videos
    </button>

  )
}

export default App
