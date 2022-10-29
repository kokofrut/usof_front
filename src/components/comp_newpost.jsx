import {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import "../css/App.css"
import InputTags from '../assets/tags'
import Tag from './comp_tag'
import axios from "axios"
import Header from '../components/comp_header'
export default function NewPost(){
    const [update, setUpdate] = useState()
    const [user, setUser] = useState()
    const [title, setTitle] = useState('')
    const [addedPost, setAddedPost] = useState()
    const [content, setContent] = useState('')
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])
    const [categoriesdata, setCategoriesdata] = useState([])
    const [file, setFile] = useState();
    const [imgFile, setImgFile] = useState();
    const [imgPreview, setImgPreview] = useState()

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
    useEffect(() => {
        async function fetchcategories() {
          try {
            let url = "http://localhost:6969/api/categories"
            await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
            .then(response => response.json()).then((data) => {
              let arr = []
              for (let i = 0; i < data.length; i++){
                arr.push(data[i].title)
              }
              setCategoriesdata(arr);})
          }
          catch (err) {console.error(err.message)}
        }
        fetchcategories()
      }, [])

    function autoComplete(inp, arr) {
        let currentFocus;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            a = document.createElement("DIV");
            
            a.setAttribute("id", this.id + "autoComplete-list");
            a.style.height = '138px';
            a.setAttribute("class", "autoComplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    a.style.height = '0px'
                    closeAllLists();
                });
                a.appendChild(b);
                }
            }
        });
        
        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autoComplete-items");
            x[0]? x[0].style.height = '0px': ''
            for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
            }
        }
        }

        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }
    

    function handleCategory(event, value) {
        event.preventDefault();
        autoComplete(document.getElementById("category"), categoriesdata);
        event.target.placeholder = 'Press space to add category'
        let lastchar = value.substr(value.length - 1)
        if (value.length >= 4 && lastchar === ' ') {
            event.target.value = ''
            let temp
            categories.length < 10? (temp = [...categories, value.substr(0, value.length - 1)], temp=[...new Set(temp)]): (temp = [...categories], event.target.placeholder = 'No more than 10 categories')
            setCategories(temp)
            console.log(categories)
        }
        // else if (value.length >= 4 && lastchar !== ' ' && event.keyCode === 13) {
        //     event.target.value = ''
        //     let temp
        //     categories.length < 10? (temp = [...categories, value], temp=[...new Set(temp)]): (temp = [...categories], event.target.placeholder = 'No more than 10 categories')
        //     setCategories(temp)
        //     console.log(categories)
        // }
        else if (lastchar === ' ' && value.length <= 3) {
            event.target.value = value.substr(0, value.length - 1)
        }
    }
    function removeCategory(item) {
        let arr = (categories.filter(function (c) { return c != item}))
        setCategories(arr)
    }
    const addTag = (e) => {
        if (e.keyCode === 13) {
          console.log('Enter')
        }
      }
    async function handleNewPost(e) {
        //   console.log('New post')
        //   return navigate("/newpost")
        // }
        e.preventDefault()
        let id = localStorage.getItem('id');
        let data = {
            title: title,
            content: content,
            author_id: id,
            categories: categories
        }
        console.log(data)
        setTitle('')
        setContent('')
        setCategories([])
        let url = `http://localhost:6969/api/posts`
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }).then(response => response.json())
        .then((data) => {
            const formData = new FormData();
            for(var x = 0; x<file.length; x++) {
                formData.append('postImage', file[x])
            };
            let url = "http://localhost:6969/api/posts/image/" + data[0].id;
            axios.post(url ,formData);
            location.reload();
        })
        // const formData = new FormData();
        //                 for(var x = 0; x<file.length; x++) {
        //                     formData.append('postImage', file[x])
        //                 };
        //                 console.log(formData.get('postImage'));
        //                 url = "http://localhost:6969/api/posts/image/" + data;
        //                 axios.post(url ,formData);
        //                 location.reload();
    }
 
    function onChange(e) {
        setFile(e.target.files)
        setImgPreview(URL.createObjectURL(e.target.files[0]))
        console.log(e.target.files)
    }
    return (
        <>
            <Header /><div id="form-container">
                <form id="new-post" autoComplete="off">
                    <label htmlFor="title">Title</label>
                    <textarea required id="title" value={title} onChange={(e) => { setTitle(e.target.value) } } placeholder="Your title..." name="story" rows="2" cols="60"></textarea>
                    <label htmlFor="story">Description of your post</label>
                    <textarea required id="story" value={content} onChange={(e) => { setContent(e.target.value) } } placeholder="Your story..." name="story" rows="7" cols="100"></textarea>
                    <label htmlFor="postImage">Attach your image to your post</label>
                    <input required type="file" id="postimage" name="postImage" onChange={onChange} />
                    <img src={imgPreview} alt="Preview" className="imagefull"></img>
                    <label>Categories</label>
                    <div className="autoComplete">
                        <input required type="text" id='category' onKeyUp={addTag} placeholder="Press space to add" onChange={(e) => { handleCategory(e, e.target.value) } }></input>
                    </div>
                    <div className="tags">
                        {categories.map((category, i) => (<Tag key={i} value={category} remove={removeCategory} />))}
                    </div>
                    <button onClick={handleNewPost}> Add Post</button>
                </form>
                {/* <button onClick={addImage}> Add Image</button> */}
            </div>
        </>
    )
}