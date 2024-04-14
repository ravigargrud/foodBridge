import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

// get user record from /user/{id} api on port 8000

function App() {
  const [count, setCount] = useState(0)

  const[data, setData] = useState({})

  useEffect(() => {
    axios.get('http://localhost:8000/getUser/1')
      .then(response => {
        // handle the response data
        // console.log(response.data.email);
        setData(response.data)
      })
      .catch(error => {
        // handle the error
        console.error(error);
      });
  }, []);



  return (
    <div>
      App
    </div>
  )
}

export default App
