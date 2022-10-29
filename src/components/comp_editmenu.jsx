import "../css/editmenu.css"
import Header from '../components/comp_header'
import {useState, useEffect} from 'react'
export default function EditMenu() {
    const [post, setPost] = useState({})
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        async function fetchPost() {
            try {
                let id = location.pathname.split('/').pop()
                let url = 'http://localhost:6969/api/posts/' + id
                const response= await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                let data = await response.json()
                setPost(data)
                console.log(data)
            }   
            catch (err) {console.error(err)}
        }
        async function fetchUserId() {
            try {
                let id = localStorage.getItem('id')
                let url = 'http://localhost:6969/api/users/' + id
                const response= await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                let data = await response.json()
                console.log(data)
                data.role_id === 2? setAdmin(true) : ''
            }   
            catch (err) {console.error(err)}
        }
        fetchPost()
        fetchUserId()
    }, [])

    function handleEdit(e) {
        e.preventDefault()
        let value = e.target.parentNode.childNodes[0].value
        let name = 'p' + e.target.parentNode.childNodes[0].name.toLowerCase()
        let obj  = JSON.stringify({
            [name]: value
        })
        console.log(obj)
        fetch(`http://localhost:6969/api/posts/${post.id}`, {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: obj})
        .then(response => response.json())
        .then(data => (data?setPost(data):''))
        // make patch fetch with data from inputs stored in object
    }

    return (
        <div>
            <Header />
            <div className="edit-menu-container">
                <div className="edit-menu">
                    <table className="table table-searchP">
                        <tbody>
                            <tr>
                                <td className="sett-labels"><label htmlFor="Login">Title</label></td>
                                <td><input type="text"  placeholder={post.title? post.title: ''} name="title"></input>
                                <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                            </tr>
                            <tr>
                                <td className="sett-labels"><label htmlFor="Login">Content</label></td>
                                <td><textarea type="text"  placeholder={post.content? post.content: ''} name="content" cols="50" rows="10"></textarea>
                                <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                            </tr>
                            {admin === true && 
                                (<><tr>
                                    <td className="sett-labels"><label htmlFor="Login">Author Id</label></td>
                                    <td><input type="text"  placeholder={post.author_id? post.author_id: ''} name="author_id"></input>
                                    <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                </tr>
                                <tr>
                                    <td className="sett-labels"><label htmlFor="Login">Status</label></td>
                                    <td><input type="text"  placeholder={post.status? post.status: ''} name="status"></input>
                                    <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                </tr>
                                <tr>
                                    <td className="sett-labels"><label htmlFor="Login">Date</label></td>
                                    <td><input type="text"  placeholder={post.publish_date? post.publish_date: ''} name="publish_date"></input>
                                    <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                </tr>
                                <tr>
                                    <td className="sett-labels"><label htmlFor="Login">Likes</label></td>
                                    <td><input type="text"  placeholder={post.likes? post.likes: ''} name="author_id"></input>
                                    <button type="button" onClick={(e) => (handleEdit(e))}>Change</button></td>
                                </tr></>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 