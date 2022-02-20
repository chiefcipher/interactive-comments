
import React  from "react"
import ReplyIcon from './icon-reply.svg'
import "./ReplyBtn.css"
const button = props => ( 
    <button className="btn btn__reply" onClick={props.clicked} >
        <img src={ReplyIcon} alt='Reply Icon' className="btn__reply--image"/> 
        <span className="btn__reply--text">Reply</span>
    </button>
)

export default button