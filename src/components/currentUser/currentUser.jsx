import React from 'react'
import "./currentUser.css"

const user = props => {
    
    return (
    <div className="user"> 
        <picture className="user__image" > 
            <source srcSet={`${process.env.PUBLIC_URL}/${props.user.image['png'].substring(2)}`} media="(min-width : 600px) " alt='USER PICTURE' /> 
            <img src={`${process.env.PUBLIC_URL}/${props.user.image['webp'].substring(2)}`} alt='USER'  />

        </picture>

       <textarea className='user__text-area' 
            placeholder='Add a comment' 
            value={props.value}
            onChange={(event) => props.changeInput(event , props.from)} 
            /> 

       <button className='user__send-btn btn' 
                onClick={props.newComment }> 
                {props.type} 
         </button>

    </div>
    )   
}

export default user 