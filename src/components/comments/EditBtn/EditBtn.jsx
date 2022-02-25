import React from 'react'
import classes from './EditBtn.module.css'
import {ReactComponent as EditIcon } from './icon-edit.svg'

const EditBtn = props => ( 
    <div className={classes.edit} onClick={props.clicked}> 
        <EditIcon className={classes.image} />
        <span className={classes.text }> Edit </span>
    </div> 
)


export default EditBtn ; 