import "../css/App.css"
import "../css/header.css"
import {useEffect, useState, useRef,} from "react"
import {useNavigate, redirect} from "react-router-dom"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const pathimg = 'http://localhost:5173//'
function Header({ app }){
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const searchRef = useRef()
    let activepage = location.pathname
    function onSubmit() {
        if (searchRef.current.value === '') return
        return navigate(`/search?query=${searchRef.current.value}`)
    }
    useEffect(() => {
        let urlimage = 'http://localhost:6969/api/users/img/' + localStorage.getItem('id')
        let url = `http://localhost:6969/api/users/`+ localStorage.getItem('id')
        async function fetchData() {
            await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}}
            ).then(response => response.json())
            .then(data => {setUser(data);})
        }
        
        fetchData()
    }, [])
    function handleAdminMenu(e) {
        e.preventDefault()
        return navigate(`/admin/${user.id}`)
    }
    function handleLogout(e) {
        e.preventDefault()
        return navigate("/login")
    } 
    function handleLogin(e) {
        e.preventDefault()
        return navigate("/login")
    }
    function handleRegister(e) {
        e.preventDefault()
        return navigate("/register")
    }
    function handleMain(e) {
        e.preventDefault()
        return navigate("/main")
    }
    function handleSettings(e) {
        e.preventDefault()
        return navigate("/settings/" + user.id)
    }
    let image = user.profile_pic;
    let role = user.role_id;
    let login = user.login;
    let imgurl
    role = role === 1? 'User' : 'Admin' 
    if (image === '' || image === null || image === undefined ) {
        imgurl = pathimg + 'default.svg'
    }
    else {
        imgurl = image
    }
    
    if (app==='app') {
        return (
            <div className="header-main">
            <nav className="nav-header">
                <div className="nav-name"><p>Stack<strong>Overuse</strong></p></div>
                <div className="nav-buttons">
                    <button className="nav btn-log" onClick={(e)=>{handleLogin(e)}}>Login</button>
                    <button className="nav btn-reg" onClick={(e)=>{handleRegister(e)}}>Register</button>
                </div>
            </nav>
            </div>
        ) 
    }
    else {
        return (
            <div className="header-main">
                <nav className="nav-header">
                    <div className="nav-menu">
                        <input type="checkbox" id="menu_checkbox"></input>
                        <label htmlFor="menu_checkbox" >
                            <div ></div>
                            <div ></div>
                            <div ></div>
                        </label>
                        <div className="nav-rollout-menu" id="nav-rollout-menu">
                            <button type="button" className='nav-rollout-buttons' onClick={(e)=>(handleMain(e))}> Main</button>
                            <button type="button" className='nav-rollout-buttons' onClick={(e)=>(handleSettings(e))}>Settings</button>
                            {user.role_id === 2 && <button type="button" className="nav-rollout-buttons" onClick={(e)=>(handleAdminMenu(e))}>Admin Menu</button>}
                            <button type="button" className='nav-rollout-buttons' onClick={(e)=>(handleLogout(e))}>Logout</button>
                        </div>
    
                    </div>
                    <div className="nav-name"><p>Share<b>Your</b><strong style={{fontSize:25 + 'px', fontWeight: 'bold', color: 'red' }}>Q&A</strong></p></div>
                    <div className="nav-search">
                        <input type="search" placeholder="Find somebodys suffer" ref={searchRef}></input>
                        <button type="button" className="btn nav-search-button" onClick={(e)=> (onSubmit())} ><img src="/search.svg"></img></button>
                    </div>
                    <div className="nav-user">
                        <p><strong>{role}</strong></p>
                        <p>{login}</p>
                        <img src={imgurl} className="image64px"></img>
                    </div>
                </nav>
            </div>
        ) 
    }
}

export default Header