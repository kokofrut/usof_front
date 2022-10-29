import "../css/App.css"
import "../css/comment.css"
import {useState, useEffect} from 'react'

export default function Comment(props) {
    const [data, setData] = useState(props.data)
    const [user, setUser] = useState({})
    useEffect (() => {
        async function fetchUser() {
            try {
                fetch(`http://localhost:6969/api/users/${data.author_id}`, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                .then(response => response.json())
                .then(data => setUser(data))
            }
            catch (err) {console.error(err)}
        }
        fetchUser()
    }, [])
    let image = user.profile_pic;
    let imgurl
    if (image === '' || image === null || image === undefined ) {
        imgurl = '/default.svg'
    }
    else {
        imgurl = image
    }
    let date = new Date(data.publish_date)
    let date_publish = date.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        hour12: false,
      })
    // console.log(date_publish)
    return (
        <div className={'post-page-comment comment-' + data.id}>
            <div className='comment-header'>
                <div className='comment-user'>
                    <img src={imgurl} className="comment-image"></img>
                    <p>{user.login}</p>
                </div>
                <div className='comment-time'>{date_publish}</div>
            </div>
            <div className="post-page-comment-container">
                <p>{data.content}</p>
            </div>
        </div>
    )
}