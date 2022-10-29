// import "../css/App.css"
import "../css/post.css"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
const pathimg = 'http://localhost:5173//'

const Category = (data) => {
    return (
        <div>{data.data.title}</div>
    )
}

export default function Post(props){
    const comments = props.comments
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [data, setData] = useState({})
    const [like, setLike] = useState([])
    const [categories, setCategories] = useState([])
    let update = false

    useEffect(() => {
        async function fetchCategories() {
            // console.log(props.data)
            if (props.data) { 
                try {
                    let url = `http://localhost:6969/api/posts/${props.data.id}/categories`
                    const result = await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                    let data = await result.json()
                    // console.log(data)
                    setCategories(data)
                }
                catch (err) {console.error(err)}
            }}
        fetchCategories()

    }, [])
    const handleLikeDislike = (e) => {
        let target = e.target
        target.tagName === 'IMG'? target = target.parentNode : ''
        let type
        let pressed
        let another
        let url = 'http://localhost:6969/api/posts/' + data.id + '/like'
        target.classList.contains('btn-like') ? type = 1 : type = 2
        target.classList.contains('pressed') ? (pressed = true) : (pressed = false)
        if (type === 1) {
            target.parentNode.childNodes[0].classList.contains('pressed')? another = true: another = false
        }
        else {
            target.parentNode.childNodes[2].classList.contains('pressed')? another = true: another = false
        }
        let dataLike = JSON.stringify({
            'author_id': localStorage.getItem('id'),
            'type': type,
            'pressed': pressed,
            'another': another
        })
        // console.log(dataLike)
        fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: dataLike})
        location.reload()
    }
    function handleDelete(data) {
        let conf = window.confirm("Do you want to delete this post?")
        if (conf) {
            let url = 'http://localhost:6969/api/posts/' + data.id
            fetch(url, {method: 'DELETE', headers: {'Content-Type': 'application/json'}})
            .then(response => {window.location.reload()})
        }
    }
    function handlePostEdit(data){
        // console.log(data)
        navigate(`/edit/${data.id}`)
    }
    function handleEdit(e, data) {
        let name = 'menu-' + data
        let menu = document.getElementsByClassName(name)
        menu[0].classList.toggle("show")
        // let target = e.target
        // target.tagName == "DIV"? target = target.parentNode: ''
        // console.log(target)
        // add dynamic id to posts then call them here
    }
    window.onclick = function(event) {
        if (!event.target.matches('.edit-div')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }
    useEffect(() => {
        props.data?
        setData(props.data)
        : ''
    }, [props])
    useEffect(() => {
        async function fetchData() {
            if (props.data) {
                try {
                    let url = `http://localhost:6969/api/users/`+ props.data.author_id
                    await fetch(url, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}}
                    ).then(response => response.json())
                    .then(data => {setUser(data);})
                }
                catch (err) {console.error(err)}
            }
        }
        fetchData()
        
    }, [props])
    useEffect(() => {
        async function fetchLike() {
            if (props.data) {
                try {
                    let url = `http://localhost:6969/api/posts/` + props.data.id + '/like'
                    await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                    .then(response => response.json())
                    .then(data => {setLike(data)})
                }
                catch (err) {console.error(err)}
            }
        }
        fetchLike()
    }, [props])
    let image = user.profile_pic;
    let imgurl
    if (image === '' || image === null || image === undefined ) {
        imgurl = pathimg + 'default.svg'
    }
    else {
        imgurl = image
    }
    // console.log(props.data)
    like.forEach(element => {
        if (element.author_id == localStorage.getItem('id') ) {
            if (element.type === 1) {
                let elem = document.getElementsByClassName('postof-' + element.entity_id)[0].childNodes[2].childNodes[0].childNodes[2]
                elem.classList.add('pressed')
            }
            else {
                let elem = document.getElementsByClassName('postof-' + element.entity_id)[0].childNodes[2].childNodes[0].childNodes[0]
                elem.classList.add('pressed')
            }
        }
    });
    return (
        <div className={"post postof-" + data.id}>
            {/* {console.log(data)} */}
           <div className="post-title">
                <div className="post-title-up">
                    <div className="post-title-element">
                        <img src={imgurl} className="image64px"></img>
                        <h2>{data.title}</h2>
                    </div>
                    <div className="post-title-element">
                        {/* {console.log(props)} */}
                        {(user.id == localStorage.getItem('id') || props.adminuserid == data.author_id  || props.adminmenu == true) && <div className="edit-dropdown">
                                <label htmlFor = "" onClick={()=>{return false}} className="edit-label">
                                <div onClick={(e)=>handleEdit(e, data.id)} className="edit-div"></div>
                                <div onClick={(e)=>handleEdit(e, data.id)} className="edit-div"></div>
                                <div onClick={(e)=>handleEdit(e, data.id)} className="edit-div"></div>
                            </label>
                            <div id="dropdown-content" className={"dropdown-content menu-" + data.id}>
                                <div><a href="" onClick={()=>(handlePostEdit(data))}  >EDIT</a></div>
                                <div><a href="#" onClick={()=>{handleDelete(data);return false;}}>DELETE</a></div>
                            </div>
                            
                        </div>}
                    </div>
                </div>
                <div className="post-title-down">
                    
                    {categories.length !== 0 ? categories.map((el, i) => (
                        <Category key={el.id} data={el} />)):""}
                </div>
            </div>
            <div className="post-data">
                {data.image !== null ? <img src={data.image} loading="lazy" alt="image" className="imagepost"></img>: ''}
                <div className="post-data-text">
                    <label ></label>
                    <p>{data.content}</p>
                </div>
            </div>
            <div className="post-footer">
                <div className="post-likes">
                    <button className="btn btn-dislike" onClick={(e)=>{handleLikeDislike(e)}} ><img src={"/dislike.svg"}></img></button>
                    <p><strong>{data.likes}</strong></p>
                    <button className="btn btn-like" onClick={(e)=>{handleLikeDislike(e)}} ><img src={"/like.svg"}></img></button>
                </div>
                {comments && <Link to={"/posts/" + data.id}>
                   <button className="post-comment-btn" type="button">Comments</button>
                </Link>}
                
            </div>
        </div>
    )
}