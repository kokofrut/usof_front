import "../css/App.css"
import InputTags from '../assets/tags'
import Header from "./comp_header"
import Posts from "./comp_posts"
import NewPost from "./comp_newpost"
import { useEffect, useState } from "react";
import {Navigate, redirect} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import Footer from "./comp_footer"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function Main() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated")|| false);
  useEffect(() =>  {
    async function fetchData() {
      try {
          let author_id = localStorage.getItem('id')
          let url = "http://localhost:6969/api/users/" + author_id
          const response = await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
          if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
          }
          const result = await response.json();
          setUser(result);
      }
      catch (err) {console.error(err.message);}
    }
    fetchData()
  }, [])
  
  const [user, setUser] = useState({})
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesdata, setCategoriesdata] = useState([])
  const [openForm, setOpenForm] = useState(false)



  // function handleOpenForm() {
  //   let div = document.getElementById('form-container')
    
  //   if (openForm) {
  //     setOpenForm(false);
  //     div.style.height = 0 + 'px';
  //   }
  //   else if (!openForm) {
  //     setOpenForm(true);
  //     div.style.height = 100 + 'vh';
  //   }
  // }
  function handleNewPost() {
    console.log('New post')
    return navigate("/newpost")
  }
  //   let id = localStorage.getItem('id');
  //   let data = {
  //     title: title,
  //     content: content,
  //     author_id: id,
  //     categories: categories
  //   }
  //   console.log(categoriesdata)
    // let url = `http://localhost:6969/api/posts`
    // const response = fetch(url, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json'},
    //   body: JSON.stringify(data)
    // }).then(response => response.json())
  // }
  // function handleCategory(value) {
  //   let temp = value
  //   let newtemp = temp.split(',')
  //   const results = newtemp.map(element => {
  //     return element.trim();
  //   });
  //   setCategories(results)
  //   console.log(categories)

  // }
  return (
        <div className="main" >
            {authenticated? '': <Navigate to='/login' replace={true} />}
            <Header  app='main'/>
            <div className="greetings">
                <p>Welcome to your Dashboard {user.full_name? user.full_name: user.login}</p>
            </div>
            <label htmlFor="addpost" className="button-label">
              <div className="button_plus" type="submit" id="addpost" onClick={handleNewPost}></div>
              Add new post</label>
            {/* <NewPost /> */}
            {/* <div id="form-container">
              <form onSubmit={()=>{handleNewPost()}} id="new-post">
                <label htmlFor="title">Title</label>
                <textarea id="title" value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="Your title..." name="story" rows="2" cols="60"></textarea>
                <label htmlFor="story">Description of your post</label>
                <textarea id="story" value={content} onChange={(e) => {setContent(e.target.value)}} placeholder="Your story..." name="story" rows="7" cols="88"></textarea>
                <label>Categories</label>
                <input type="text" placeholder="Ctg-ries separated by coma"  onChange={(e) => {handleCategory(e.target.value)}}></input>
                <button type="submit" > Add Post</button>
              </form>
              <InputTags
                onTag={values => { console.log(values); setTags(values) }}
                color='#f14668'
                placeHolder="Press enter to add tags"
              />
              <p>Your tags are : </p>
              <pre>{tags.join(', ')}</pre>
            </div> */}
            <Posts />
            <Footer />
        </div>
  );
};
export default Main;