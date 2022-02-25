import React  from "react";
import Button from "./AddReduceBtn/AddReduceBtn"
import ReplyBtn from "./ReplyBtn/ReplyBtn"
import DeleteBtn from './DeleteBtn/DeleteBtn'
import EditBtn from "./EditBtn/EditBtn";
import "./comments.css"
import User from "../currentUser/currentUser";

const comment = props => {

    const comments = 
    props.comments.map(comment => ( 
        <React.Fragment key={comment.id} >
        <div className='comment'> 

            <div className='comment__counter'>
                <Button vote={()=> props.vote(comment.id , 'comment', null , 'upvote')}> <img src={`${process.env.PUBLIC_URL}/images/icon-plus.svg`} alt="increase score" /> </Button>
                    <span className="comment__counter--number"> 
                    {comment.score}
                    </span> 
                <Button vote={()=> props.vote(comment.id , 'comment' , null , 'downvote' )}> <img src={`${process.env.PUBLIC_URL}/images/icon-minus.svg`} alt="decrease score" />  </Button> 
            </div>
            <div className="comment__details">
                <picture className="comment__image">
                    <source media="(min-width : 600px)" srcSet={`${process.env.PUBLIC_URL}/${comment.user.image['png'].substring(2)}`}  /> 
                    <img src={`${process.env.PUBLIC_URL}/${comment.user.image['webp'].substring(2)}`} alt="User" /> 
                </picture> 
             
                <div className="comment__name">{comment.user.username}</div>
                {comment.user.username === props.user.username ? <div className="you"> you</div> : null  }
                <div className="comment__time">{props.timeStampConverter(comment.createdAt)}</div>
            </div> 
            
            <div className="comment__icons"> 
            { 
                comment.user.username === props.user.username ? 
                <>
                <DeleteBtn clicked={()=> props.modalHandler('comment' , comment.id)}/> 
                <EditBtn clicked={()=> props.editHandler ('comment', comment.id )}/> 
                </>
                : 
                <ReplyBtn clicked={()=> props.clickReplyBtn(comment.id)} />
            }
             
            </div> 
            <div className="comment__content" > {comment.content} </div>
            
         </div>
         <div className='edit-block' 
                style= {{
                    display :  (props.showEdit.commentID === comment.id && props.showEdit.show ) ? 'block' : 'none' }} > 

            {comment.user.username === props.user.username ? 
                <User user={props.user} newComment={props.updateComment} 
                    changeInput={props.changeInput}
                    type='UPDATE' 
                    from='update'
                    value ={props.showEdit.data} /> : null }
         </div>
         <div className='reply-block' >
         { 
             comment.replies.map (reply => ( 
            <React.Fragment key={reply.id}>
             <div className="comment reply"  >
                <div className='comment__counter'>
                <Button vote={()=> props.vote(comment.id, 'reply' , reply.id , 'upvote')}> <img src={`${process.env.PUBLIC_URL}/images/icon-plus.svg`} alt="increase score" /> </Button>
                    <span className="comment__counter--number"> 
                    {reply.score}
                    </span> 
                <Button vote={()=> props.vote(comment.id , 'reply' , reply.id , 'downvote')}> <img src={`${process.env.PUBLIC_URL}/images/icon-minus.svg`} alt="decrease score" />  </Button> 
                </div>
                 
            <div className="comment__details">
                <picture className="comment__image">
                    <source media="(min-width : 600px)" srcSet={`${process.env.PUBLIC_URL}/${reply.user.image['png'].substring(2)}`} alt="User" /> 
                    <img src={`${process.env.PUBLIC_URL}/${reply.user.image['webp'].substring(2)}`} alt="User" /> 
                </picture> 
                <div className="comment__name">{reply.user.username}</div>

                { 
                    reply.user.username === props.user.username ? <div className="you"> you</div> : null  
                }
                <div className="comment__time">{props.timeStampConverter(reply.createdAt)}</div>
            </div> 
            <div className="comment__icons">
             
            { 
                reply.user.username === props.user.username ? 
                <>
                <DeleteBtn  clicked={()=> props.modalHandler('reply' , reply.id)} /> 
                <EditBtn clicked={()=> props.editHandler ('reply', comment.id , reply.id)}/> 

                </>
                : 
                <ReplyBtn clicked={()=> props.clickReplyBtn(comment.id , reply.id )} /> 

            }
            
            </div> 
            <div className="comment__content" > 
            <span className="replying-to">@{reply.replyingTo} </span>            
            {reply.content} 
            </div>

           


             </div>
             <div className='edit-block' 
                style= {{
                    display : (props.showEdit.replyId === reply.id && props.showEdit.show ) ? 'block' : 'none'  }} > 

            {reply.user.username === props.user.username ? 
                <User user={props.user} newComment={props.updateComment} 
                    changeInput={props.changeInput}
                    type='UPDATE' 
                    from='update'
                    value ={props.showEdit.data} /> : null }
            </div> 
             </React.Fragment>
             ))
         }
         </div>


         <div className="user-reply-box" style={{display : props.showReply === comment.id ? 'block' : 'none'}}>  
                <User user={props.user} 
                    newComment={()=> props.addComment('reply' , comment.id )} 
                    changeInput={props.changeInput}
                    type='REPLY' 
                    from='reply'
                    value ={props.replyValue}/> 
         </div>

         </React.Fragment>

    ))

    const user = ( 
        <User user={props.user} 
            newComment={()=> props.addComment('comment' , null )}  
            changeInput={props.changeInput} 
            type='SEND' 
            from='comment'
            value ={props.commentValue}
            /> 
    )
    return ( 
        <main className="comment-container"> 
             {comments}
             {user}
        </main>
    )

}
export default comment  