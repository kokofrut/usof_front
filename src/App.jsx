import { useState, useEffect } from 'react'
import './css/App.css'
import PostsMain from "./components/comp_postsmain"
import { useNavigate, redirect, Navigate} from "react-router-dom";
import Header from "./components/comp_header"
function App() {
  const navigate  = useNavigate()
  const [data, setData] = useState({})
  const [authenticated, setAuthenticated] = useState(false)
  useEffect(() => {
    async function fetchData() {
      fetch ('http://localhost:6969/api/random', {method: 'GET', headers: {'Content-Type': 'application/json'}})
      .then(response => response.json)
      .then(data => {setData(data)})
    }
    fetchData()
  }, [])
  useEffect(() => {
    async function loadData() {
        try {
            console.log('fetching...')
            let url = 'http://localhost:6969/api/users/' + localStorage.getItem('id')
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            })
            const json = await response.json()
            let today = new Date()
            let exp = new Date(json.sid_exp)
            console.log(localStorage.getItem('sid'))
            console.log(json.sid)
            json.sid === localStorage.getItem('sid') ? exp > today? setAuthenticated(true): setAuthenticated(false): setAuthenticated(false)
            return json
        }
        catch (error) {
            console.log(error)
        }
    }
    loadData()
}, [])
  return (
    <div className="App">
    {authenticated? navigate('/main'): ''}
      <Header app={'app'} />
      <div className="card">
        <button onClick={() => {localStorage.setItem('authenticated', false); console.log(localStorage); console.log(sessionStorage)}}>off the auth</button>
      </div>
      <PostsMain />
    </div>
  )
}

export default App
