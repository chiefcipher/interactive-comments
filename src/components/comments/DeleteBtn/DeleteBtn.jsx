import React from 'react' 
import classes from './DeleteBtn.module.css'

const DeleteBtn = props => ( 
    <div className={classes.Delete} onClick={props.clicked}>
        <img className={classes.icon} src={`${process.env.PUBLIC_URL}/images/icon-delete.svg`} alt='DELETE' /> 
        <span className={classes.text}  >Delete </span>
    </div>    
)


export default DeleteBtn