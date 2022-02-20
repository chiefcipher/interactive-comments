import React from 'react'
import classes from './EditBtn.module.css'

const EditBtn = props => ( 
    <div className={classes.edit} onClick={props.clicked}> 
        <img className={classes.image} src={`${process.env.PUBLIC_URL}/images/icon-edit.svg`} alt='Edit' /> 
        <span className={classes.text }> Edit </span>
    </div> 
)


export default EditBtn ; 