import React from 'react' 
import classes from './modal.module.css' 

export const Modal = props => { 
    return ( 
            <div className={classes['Content-Box']} style={{display : props.show ? 'block' : 'none'}}> 
                <h1>Delete comment </h1>
                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className={classes.Buttons}>
                    <button className={classes.No} onClick={()=>props.action('cancel')}>No, Cancel </button>
                    <button className={classes.Yes} onClick={()=>props.action('delete')}>Yes, Delete</button>
                </div>
            </div> 
            
    )
}


export const Backdrop = props => (
    <div
     className={classes.Backdrop} 
     style={{display : props.show ? 'block' : 'none'}}
     onClick={()=> props.click(null , null )}>
        
    </div>
)