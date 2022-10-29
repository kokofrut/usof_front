/* eslint-disable no-lone-blocks */
import "../css/logreg.css"
import {useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
function Register(){
    const navigate = useNavigate()
    const [ready, setReady] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [conf, setConf] = useState('');
    const [email, setEmail] = useState('');
    function handleChangeToLogin(e) {
        e.preventDefault()
        return navigate("/login")
    }
    async function handleRegister(e) { 
        e.preventDefault() 
        if (login === '' || email === '' || conf === '' || password === '') {
            alert('Please enter all required fields')
        }
        else {
            var data = JSON.stringify({
                "login": login,
                "password": password,
                "conf": conf,
                "email": email
            })
            await fetch("http://localhost:6969/api/auth/register", 
                {method: 'POST', 
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                body: data 
            }).then(response => response.json())
            .then(data => {console.log('registered');setReady(true) })
        }
    }
    return (
        <div className="reg-wrapper">
            <div className="reg-box">
                {ready === true && navigate('/login')}
                <form className="reg-form" onSubmit={handleRegister}>
                    <label htmlFor="name">Login</label>
                    <input type="text" value={login} onChange={(e) => {setLogin(e.target.value)}} name="login" placeholder="Login" autoComplete="off"></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} name="password" placeholder="Password" autoComplete="off"></input>
                    <label htmlFor="conf">Password Confirmation</label>
                    <input type="password" value={conf} onChange={(e) => {setConf(e.target.value)}} name="conf" placeholder="Confirm Password" autoComplete="off"></input>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} name="email" placeholder="Email" autoComplete="on"></input>
                    <div className="form-buttons">
                        <button type="submit" className="reg-button">Submit</button>
                        <button type="button" onClick={(e) => {handleChangeToLogin(e)}} className="change-login">Login</button>
                    </div>
                </form>
            </div>
        </div>
      );
}

export default Register