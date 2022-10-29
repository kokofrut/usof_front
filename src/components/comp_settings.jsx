import "../css/App.css"
import "../css/settings.css"
import { useState, useEffect} from "react"
import Header from "./comp_header"
import axios from "axios"
export default function Settings() {
    const[user, setUser] = useState({})
    const [file, setFile] = useState();
    const [imgFile, setImgFile] = useState();
    const [imgPreview, setImgPreview] = useState()
    function handlePassword(e) {
        e.preventDefault()
        let input = e.target.parentNode.childNodes[1].childNodes[0]
        console.log(input)
        input.type === 'text'? input.type =  'password': input.type = 'text'
    }
    useEffect(() => {
        async function fetchData() {
            try {
                let url = String(window.location)
                let urlarray = url.split('/')
                let urltemp = urlarray[urlarray.length - 1];
                urltemp = urltemp.split('?')
                const author_id = urltemp[0]
                console.log(author_id)
                url = "http://localhost:6969/api/users/" + author_id
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
    function onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        console.log(file[0])
        formData.append('myImage', file[0])
        // for(var x = 0; x<file.length; x++) {
        //     console.log(file[x])
        //     formData.append('myImage', file)
        // }
        console.log(formData.get('myImage'))
        let url = "http://localhost:6969/api/upload/" + user.id
        axios.post(url ,formData)
        location.reload()
    
    }
    function onChange(e) {
        setFile(e.target.files)
        setImgPreview(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <div className="settings">
            <Header  app='settings' />
            <div className="settings-photo">
                <h1>Profile</h1>
                {console.log(user)}
                <img src={user.profile_pic ? user.profile_pic: '/default.svg'} className="image128px"></img>
                <form onSubmit={onFormSubmit} name='imageupdate' id="imageupdate">
                    <input type="file" name="myImage" onChange= {onChange} />
                    <button type="submit">Upload</button>
                </form>
                {imgPreview && <img src={imgPreview} alt="Preview" className="image128px"></img>}
            </div>
            <div className="settings-user">
                <table>
                    <tbody>

                        <tr>
                            <td className="sett-labels"><label htmlFor="Login">Login</label></td>
                            <td><input type="text" defaultValue={user.login? user.login: ''} name="Login"></input></td>
                        </tr>
                        <tr>
                            <td className="sett-labels"><label htmlFor="Password">Password</label></td>
                            <td><input type="password" defaultValue={user.password? user.password: ''} name="Password"></input></td>
                            <button className="btn btn-showpass" onClick={(e)=>(handlePassword(e))}>Hide / Show</button>
                        </tr>
                        <tr>
                            <td className="sett-labels"><label htmlFor="Email">Email</label></td>
                            <td><input type="email" defaultValue={user.email? user.email: ''} name="Email"></input></td>
                        </tr>
                        <tr>
                            <td className="sett-labels"><label >Rating</label></td>
                            <td><p> {user.rating? user.rating: 0}</p> </td>
                        </tr>
                        <tr>
                            <td className="sett-labels"><label htmlFor="Role">Role</label></td>
                            <td><p>{user.role_id === 1? 'User' : 'Admin'}</p></td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        </div>
    )
}