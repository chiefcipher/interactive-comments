import React from "react"
import "./AddReduceBtn.css"
const button = props => ( 
    <button className="btn add-decrease" onClick={props.vote}>
        {props.children}
    </button>
) 

export default button 