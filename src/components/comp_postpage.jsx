import "../css/App.css"
import "../css/post-page.css"
import {useState, useEffect} from 'react'
import Comment from "./comp_comment"
import Post from "./comp_post"
import Header from "./comp_header"
import Footer from "./comp_footer"
import NewComment from "./comp_newcomment"
export default function PostPage() {
    const [data, setData] = useState()
    const [post, setPost] = useState()
    const [user, setUser] = useState()
    useEffect(() => {
        async function fetchUser() {
            try {
                let url = "http://localhost:6969/api/users/" + localStorage.getItem('id')
                const resp = await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                let data = await resp.json()
                setUser(data)
            }
            catch (error) {console.error(error)}
        }
        fetchUser()
    }, [])
    useEffect(() =>{
        async function fetchData() {
            try {
                let url = String(window.location)
                let urlarray = url.split('/')
                const post_id = urlarray[urlarray.length - 1];
                url = 'http://localhost:6969/api/posts/' + post_id + '/comments';
                const response = await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                let data = await response.json()
                setData(data)
            }
            catch (err) {console.error(err.message)}
        }
        fetchData()
        
    }, [])
    
    useEffect(() =>{
        async function fetchPost() {
            try {
                let url = String(window.location)
                let urlarray = url.split('/')
                const post_id = urlarray[urlarray.length - 1];
                url = 'http://localhost:6969/api/posts/' + post_id;
                const response = await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                let data = await response.json()
                setPost(data)
            }
            catch (err) {console.error(err.message)}
        }
        fetchPost()
        
    }, [])
    if (!data) {
        return (<div>No comments found</div>)
    }
    else {
        console.log(data)
        let comments = []
        for (let i = 0; i < data.length; i++) {
            comments.push(<Comment key={data[i].id} data={data[i]}/>)
        }
        return (
            <div className="post-page">
                <Header app={'post-page'} />
                {post && <Post key={post.id} data={post} comments={false}/>}
                {comments.length !== 0 && <div className="comments" key={comments}>
                    {comments}
                </div>}
                {post != undefined && <NewComment post_id={post.id} />}
                {/* <Footer /> */}
            </div>
        )
    }
}