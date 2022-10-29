import "../css/App.css"
import {useState, useEffect} from 'react'

export default function Tag(props) {
    let {value, remove} = props
    return (
        <div className="tag" onClick={() => remove(value)}>{value}</div>
    )
}