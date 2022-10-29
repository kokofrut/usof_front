import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import Post from './comp_post'
import SweetPagination from 'sweetpagination'
import "../css/App.css"
function Posts({adminmenu, admindata, adminuserid}) {
    const [data, setData] = useState([])
    const [currentPageData, setCurrentPageData] = useState([]);
    const [pagedata, setPagedata] = useState([]);
    let author_id = localStorage.getItem('id')
    let url = 'http://localhost:6969/api/posts/author/' + author_id
    useEffect(() => {
        // pagedata = data.slice(0).reverse()
        
        async function fetchData() {

            if (adminmenu === false || admindata === undefined) {
                try {
                    let author_id = localStorage.getItem('id')
                    let url = "http://localhost:6969/api/posts/author/" + author_id
                    const response = await fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                    if (!response.ok) {
                        throw new Error(`Error! status: ${response.status}`);
                    }
                    const result = await response.json();

                    
                    setData(result);
                }
                catch (err) {console.error(err.message);}
            }
            else {
                setData(admindata)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {setPagedata(data.slice(0).reverse()),console.log('effect cpd  ' + data + '   ' + pagedata )}, [data]);
    // setTimeout(()=>{setCount(true), console.log(count)}, 5000)
    if (!data) {
        return (
            <p>SO ADD NEW POST</p>
        )
    }
    else {

        return (
            <div>
                <div className="posts-container">
                    {currentPageData.length !== 0 ?currentPageData.map((item, i) => (
                        <Post key={item.id} data={item} comments={true} adminuserid={adminuserid} adminmenu={adminmenu}/>
                    )): (<div id="post-addnewpost"><p>CONSIDER ADDING NEW POSTS!</p></div>)}
                </div>
                <SweetPagination
                    currentPageData={setCurrentPageData}
                    dataPerPage={2}
                    getData={pagedata}
                    getStyle={'style-3'}
                />
            </div>
        )

    }
}

export default Posts