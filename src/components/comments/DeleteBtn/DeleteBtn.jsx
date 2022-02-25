import React from 'react' 
import classes from './DeleteBtn.module.css'
import {ReactComponent as DeleteIcon} from './icon-delete.svg'

const DeleteBtn = props => ( 
    <div className={classes.Delete} onClick={props.clicked}>
        <DeleteIcon className={classes.icon} />
        <span className={classes.text}  >Delete </span>
    </div>    
)


export default DeleteBtn