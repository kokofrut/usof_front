import "../css/adminmenu.css";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/comp_header'
import Posts from '../components/comp_posts'
import Footer from "./comp_footer"
import axios from 'axios'
let searchedU
let searchedUP
export default function AdminMenu() {
    const navigate = useNavigate()
    const [searchedUser, setSearchedUser] = useState()
    const [searchedPost, setSearchedPost] = useState([])
    const [searchedUserPosts, setSearchedUserPosts] = useState([])
    const [users, setUsers] = useState([])
    const [data, setData] = useState([])
    const [currentPageData, setCurrentPageData] = useState([]);
    const [pagedata, setPagedata] = useState([]);
    useEffect(() => {
        location.pathname.split('/').pop() === localStorage.getItem('id')? '': navigate('/main')
        async function fetchData() {
            try {
                fetch('http://localhost:6969/api/users', {method: 'GET', headers: {'Content-Type': 'application/json'}})
                .then(response => response.json())
                .then(data => setUsers(data))
            }
            catch (err) {console.error(err)}
        }
        fetchData()
    },[])
    useEffect(() => {setSearchedUserPosts([])}, [searchedUser])
    function handleHide(e) {
        e.preventDefault()
        setSearchedUser()
        setSearchedUserPosts([])
    }
    function handleHidePost(e) {
        e.preventDefault()
        setSearchedPost([])
    }
    function handleSearchPost(e) {
        // e.preventDefault()
        let query = e.target.parentNode.childNodes[0].value.trim()
        // console.log(query)
        fetch(`http://localhost:6969/api/posts/title?search=${query}`, {method: 'POST', headers: {'Content-Type': 'application/json',}})
        .then(response => response.json())
        .then(data => (setSearchedPost(data)));
    }
    function handleEdit(e) {
        e.preventDefault()
        let value = e.target.parentNode.childNodes[0].value
        let name = 'u' + e.target.parentNode.childNodes[0].name.toLowerCase()
        console.log(value)
        let obj  = JSON.stringify({
            [name]: value
        })
        fetch(`http://localhost:6969/api/users/${searchedUser.id}`, {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: obj})
        .then(response => response.json())
        .then(data => (data?setSearchedUser(data):''))
        // make patch fetch with data from inputs stored in object
    }

    function handleShowUserPosts(e) {
        e.preventDefault()
        console.log('fetching posts from user with id: ' + searchedUser.id)
        fetch(`http://localhost:6969/api/posts/author/${searchedUser.id}`)
        .then(response => response.json())
        .then(data => (searchedUP = true, setSearchedUserPosts(data)))
    }

    function handleSearch(e) {
        e.preventDefault()
        // debugger
        let value = e.target.parentNode.childNodes[0].value
        let search = users.filter(user => user.login.toLowerCase() === value.toLowerCase())
        search.length !== 0? (searchedU = true, setSearchedUser(search[0])) : (searchedU = false, setSearchedUser())
        console.log(search[0])
        
    }
    return (
        <div className="admin-container">
            <Header />
            <div className="admin-menu">
                Admin Menu
                <div className="admin-search-user">
                    <div className="admin-search-input">
                        <input type="text" placeholder="user login"></input>
                        <button type="button" className="btn btn-search" onClick={(e)=>(handleSearch(e))}>Search</button>
                    </div>
                    {searchedU === true? searchedUser != undefined?
                        (<div className="admin-search-table">
                            <table className="table table-searchU">
                                <tbody>

                                    <tr>
                                        <td className="sett-labels"><label htmlFor="Login">Login</label></td>
                                        <td><input type="text"  placeholder={searchedUser.login? searchedUser.login: ''} name="Login"></input>
                                        <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                        {/* <td></td> */}
                                    </tr>
                                    <tr>
                                        <td className="sett-labels"><label htmlFor="Password">Password</label></td>
                                        <td><input type="text"  placeholder={searchedUser.password? searchedUser.password: ''} name="Password"></input>
                                        <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                    </tr>
                                    <tr>
                                        <td className="sett-labels"><label htmlFor="Full_name">Full Name</label></td>
                                        <td><input type="text"  placeholder={searchedUser.full_name? searchedUser.full_name: ''} name="Full_name"></input>
                                        <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                    </tr>
                                    <tr>
                                        <td className="sett-labels"><label htmlFor="Email">Email</label></td>
                                        <td><input type="email"  placeholder={searchedUser.email? searchedUser.email: ''} name="Email"></input>
                                        <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                    </tr>
                                    <tr>
                                        <td className="sett-labels"><label >Rating</label></td>
                                        <td><input type="number"  placeholder= {searchedUser.rating? searchedUser.rating: 0} name="Rating"></input>
                                        <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                    </tr>
                                    <tr>
                                        <td className="sett-labels"><label htmlFor="Role">Role</label></td>
                                        <td><input type="text"  placeholder={searchedUser.role_id === 1? 'User' : 'Admin'} name="Role_id"></input>
                                        <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                    </tr>
                                </tbody>
                                </table>
                                <button type="button" onClick={(e) => (handleHide(e))}>Hide</button>
                                <button type="button" onClick={(e) => (handleShowUserPosts(e))}>Show Posts</button>
                                {searchedUP ===true? searchedUserPosts.length != 0? (<Posts adminmenu={true} admindata={searchedUserPosts} adminuserid={searchedUser.id}/>):<div><p>User has no posts</p></div>:''}
                        </div>)
                    : <div>User undefined</div>
                    : <div>No user</div>}
                </div>


                <div className="admin-search-post">
                <div className="admin-search-input">
                        <input type="text" placeholder="post name or id"></input>
                        <button type="button" className="btn btn-search" onClick={(e)=>(handleSearchPost(e))}>Search</button>
                        <button type="button" onClick={(e) => (handleHidePost(e))}>Hide</button>
                        {searchedPost.length != 0? (<Posts adminmenu={true} admindata={searchedPost} />): ''}
                </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}