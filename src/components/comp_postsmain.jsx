import {useState, useEffect} from 'react'
import Post from './comp_post'
import "../css/App.css"
function PostsMain() {
    const [data, setData] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                let url = "http://localhost:6969/api/random"
                await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                .then(response => response.json())
                .then(data => {setData(data)})
            }
            catch (err) {console.error(err.message);}
        }
        fetchData()
    }, [])
    // setTimeout(()=>{setCount(true), console.log(count)}, 5000)
    if (!data) {
        return (
            <>
                <p>Loading...</p>
            </>
        )
    }
    else {

        return (
            <div>
                <div><p>Check out more right now!</p></div>
                <div className="posts-container">
                    {/* {data[0].title} */}
                    {data.map((item) => (
                        <Post key={item.id} data={item} comments={true}/>
                    ))}
                </div>
                
            </div>
        )

    }
}

export default PostsMain