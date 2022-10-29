import "../css/App.css"
import "../css/search.css"
import {useState, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import Header from "./comp_header"
import Footer from "./comp_footer"
import Post from "./comp_post"

const SearchPosts = () => {
    const [posts, setPosts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    let search = searchParams.get("query")
    let filteredSearch = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    useEffect(() => {
        function fetchData() {
            try {
                fetch('http://localhost:6969/api/posts', {method: 'GET', headers: {'Content-Type': 'application/json'}})
                .then(response => response.json())
                .then(data => setPosts(data))
            }
            catch (err) {console.error(err)}
        }
        fetchData()
    }, [])
    console.log(filteredSearch)
    return (
        <div className="search-posts">
            {filteredSearch[0]? filteredSearch.map((item) => (<Post key={item.id} data={item} comments={true}/>))
            :<>
                <div id="post-addnewpost">
                    <p>Nothing was found</p>
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>
                
            </>}
        </div>
    )
}

export default function SearchRes() {
    return (
        <div className="search-main">
            <Header  />
            <div className="posts-wrapper">
                <div className="posts-container">
                    <SearchPosts />
                </div>
            </div>
            <Footer />
        </div>
    )
}