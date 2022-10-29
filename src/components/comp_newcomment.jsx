import "../css/comment.css"
import {useState, useEffect} from 'react'

const NewComment = (props) => {
    const [content, setContent] = useState('')
    function fetchNewComment(url, data) {
        fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: data})
        location.reload()
    }
    function handleNewComment(e) {
        let input = document.getElementById('newcomment')
        let data = JSON.stringify({
            'author_id': localStorage.getItem('id'),
            'content': content
        })
        let url = `http://localhost:6969/api/posts/${props.post_id}/comments`
        input.value.length !== 0? fetchNewComment(url, data): ''
        

    }
    return (
        <div className="newcomment">
            <input type="text" placeholder="Type something..." name="newcomment" id="newcomment" value={content} onChange={(e)=>setContent(e.target.value)}></input>
            <button onClick={(e) => handleNewComment(e)}>Send</button>
        </div>
    )
}


export default NewComment