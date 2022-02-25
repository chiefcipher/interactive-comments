import React from 'react'
import classes from "./currentUser.module.css"

const user = props => {
    
    return (
    <div className={classes.user}> 
        <picture className={classes.image}> 
            <source srcSet={`${process.env.PUBLIC_URL}/${props.user.image['png'].substring(2)}`} media="(min-width : 600px) "  /> 
            <img src={`${process.env.PUBLIC_URL}/${props.user.image['webp'].substring(2)}`} alt='USER'  />

        </picture>

       <textarea className={classes['text-area']} 
            placeholder='Add a comment' 
            value={props.value}
            onChange={(event) => props.changeInput(event , props.from)} 
            /> 

       <button className={classes['send-btn']}
                onClick={props.newComment }> 
                {props.type} 
         </button>

    </div>
    )   
}

export default user 