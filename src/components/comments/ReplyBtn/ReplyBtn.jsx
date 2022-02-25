
import React  from "react"
import {ReactComponent as ReplyIcon}from './icon-reply.svg'
import classes from "./ReplyBtn.module.css"
const button = props => ( 
    <button className={classes.reply} onClick={props.clicked} >
        <ReplyIcon className={classes.image}/> 
        <span className={classes.text}>Reply</span>
    </button>
)

export default button