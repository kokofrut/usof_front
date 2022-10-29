/* eslint-disable no-lone-blocks */
import "../css/logreg.css"
import {useState, useEffect} from "react"
import {Link, useNavigate, Navigate} from 'react-router-dom'
import {redirect} from 'react-router-dom'
function Login() {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState()
    const [login, setLogin] = useState('');
    // console.log(sessionStorage)
    // console.log(localStorage)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [authenticated, setAuthenticated] = useState();
    useEffect(() => {
        console.log(localStorage)
    }, [])
    async function handleLogin(e) {
        e.preventDefault()
        if (login === '' || email === '' || password === '') {
            alert('Please enter all required fields')
        }
        else {
            var data = JSON.stringify({
                "login": login,
                "password": password,
                "email": email
            })
            await fetch("http://localhost:6969/api/auth/login", 
                {method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: data 
            }).then(response => response.json())
            .then(data => {if (data) {
                console.log('fetching on click with data');
                setUser(data); 
                console.log(data)
                localStorage.setItem('id', data.id); 
                localStorage.setItem('sid', data.sid); 
                setReady(true) }})
        
        }
    }
    function handleChangeToRegister(e) {
        e.preventDefault();
        return navigate("/register")
    }

    return (
        <div className="reg-wrapper">
            <div className="reg-box">
                {ready === true? (()=>{setReady('false')},navigate('/')):''}
                <form className="reg-form" onSubmit={handleLogin}>
                    <label htmlFor="name">Login</label>
                    <input required type="text" value={login} onChange={(e) => {setLogin(e.target.value)}} name="login" placeholder="Login" autoComplete="off"></input>
                    <label htmlFor="password">Password</label>
                    <input required type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} name="password" placeholder="Password" autoComplete="off"></input>
                    <label htmlFor="email">Email</label>
                    <input required type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} name="email" placeholder="Email" autoComplete="on"></input>
                    <div className="form-buttons">
                        <button type="submit" >Submit</button>
                        <button type="button" onClick={(e) =>{handleChangeToRegister(e)}}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Login