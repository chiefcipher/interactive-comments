import React , {Component} from 'react'
import './App.css';
import data from './users.json'
import Comments from '../components/comments/comments' 
import {Modal , Backdrop}   from '../UI/Modal/Modal'

class App extends Component {
  constructor(props) { 
    super(props) 
    const currentData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : data  
    
    this.state = {
     ...currentData  , 
     showReplyBlock : null , 
     replyToID : null  , 
     newCommentContent : ''  ,
     newReplyContent : ''  , 
     deleteModal : { 
       itemType  : null , 
       itemID : null , 
       show : false
     }, 
     editContent : { 
       type : null , 
       commentID: null , 
       show : false ,
       data : '' 
     }
    }
  }


  //UPVOTE HANDLER TAKES FIRST ARGUMENT AS COMMENT ID, SECOND AS TYPE (COMMENT/REPLY) , THIRD ARGUMENT AS REPLY ID IF SECOND ARGUMENT IS REPLY
  voteHandler = (commentID , commentType, replyID = null  , voteType = 'upvote')=> { 
    if (commentType === 'comment' && !replyID) { 
      const comment =  {...this.state.comments.find(comment => (comment.id === commentID))}

      const setVote = ()=>  (voteType === 'upvote' ? comment.score += 1 : comment.score === 0 ? 0 : comment.score -= 1)
      setVote() ;

      const commentIndex = this.state.comments.findIndex(comment => ( comment.id === commentID))
  
      const updatedComments = [...this.state.comments] 
      updatedComments[commentIndex] = comment ; 
      updatedComments.sort((a , b) => b.score - a.score )
      let sorted = false  ; 
      for (let c = 0 ; c < updatedComments.length ; c++ ) { 
        if (updatedComments[c].id !== [...this.state.comments][c].id && !sorted ) { 
          sorted = true
        } 
      }
      sorted ? alert('Sorted') : console.log('not sorted')
      this.setState({
        comments : updatedComments
      })
    }
    else if (commentType=== 'reply' && replyID ) { 
      const commentRepliedTo = {...this.state.comments.find(comment => (
        comment.replies.find(reply => reply.id === replyID)

      ))}

      const replyIndex = commentRepliedTo.replies.findIndex( reply => ( 
        reply.id === replyID
      ))

      const commentIndex = this.state.comments.findIndex ( comment => (
        comment.id === commentID
      ))

      const setVote = ()=>  (voteType === 'upvote' ? commentRepliedTo.replies[replyIndex].score += 1 : commentRepliedTo.replies[replyIndex].score === 0 ? 0 : commentRepliedTo.replies[replyIndex].score -= 1)
      setVote() ;

      
      const updatedComments = [...this.state.comments] 
      updatedComments[commentIndex] = commentRepliedTo ;
      this.setState({ 
        comments : updatedComments
      })


    }

  }

  addCommentHandler = ( commentType , commentID , replyID = this.state.replyToID )=> { 

    const comments =  [...this.state.comments] 
    
    if (commentType === 'comment') { 

      const newComment = { 
        content : this.state.newCommentContent , 
        createdAt : Date.now() , 
        id: null  , 
        replies : [], 
        score : 0 , 
        user : {...this.state.currentUser}
  
      }
      comments.push({...newComment})
    }
    else if (commentType === 'reply' ) { 

      const replyToComment = comments.find(comment => comment.id === commentID)
      const replyToCommentIndex = comments.findIndex( comment => comment.id === commentID)
      const replyingToReply = replyToComment.replies.find( reply => reply.id === this.state.replyToID)
      
      let replyTo = replyID !== null ?  replyingToReply.user.username :  replyToComment.user.username ; 
  
      const reply = { 
          content : this.state.newReplyContent ,  
          createdAt : Date.now() ,
          id : null  , 
          replyingTo : replyTo, 
          score : 0 , 
          user : {...this.state.currentUser},

      }
      replyToComment.replies.push({...reply})
      comments[replyToCommentIndex] = replyToComment ; 
    }
     
    let counter = 0   ;
    comments.forEach((comment , commentIndex ) => { 
      counter += (commentIndex + 1) ;   
      comment.id = counter   

      if (comment.replies.length !== 0 ) { 
        comment.replies.forEach((reply ,replyIndex)  => { 
          reply.id = counter + replyIndex + 1 

        })
      }})

    this.setState({comments : comments   , 
                  replyToID : null ,
                  newCommentContent : '' , 
                  newReplyContent: '' ,
                   showReplyBlock : null })
  }

  //converts relative time(2 min ago) to timestamp, also timestamp to relative time
  convertTimestamp(input) { 
    const data = input.toLocaleString().split(' ') 

    const msPerMin = 60 * 1000 ; 
    const msPerHour = 60 * msPerMin ; 
    const msPerDay = 24 * msPerHour ;
    const msPerWeek = 7 * msPerDay ; 
    const msPerMonth = 31 * msPerDay ; 
    const msPerYear = 365 * msPerDay ;  
  
    let timePassed = null ; 
    if (data.length > 1 ) { 
            const shift = data[0]  //2,1 etc 
            const period = data[1] //seconds , min , day , week ,month ,year  
        return ( data.join(' '))

    }
    else { 
        timePassed = Date.now() - data[0].split(',').join('') //unix timestamp
        
        if (timePassed < msPerMin) { 
          return (Math.round(timePassed/ 1000 ) + ' seconds ago')
        }
        else if (timePassed < msPerHour) { 
          return (Math.round(timePassed/msPerMin) + ' minute ago' )
        }
        else if (timePassed < msPerDay) { 
          return (Math.round(timePassed/msPerHour) + ' hours ago')
        }
        else if (timePassed < msPerWeek) { 
          return (Math.round(timePassed/msPerDay) + ' days ago')
        }
        else if (timePassed < msPerMonth) {
          return (Math.round (timePassed/msPerDay) + ' months ago')
        }
        else if (timePassed < msPerYear) { 
          return (Math.round(timePassed / msPerMonth) + ' years ago')
        }
    }
  }
  inputChangeHandler = (event , source )=>{
    const data = event.target.value 

    if (source === 'update') { 
      this.setState(prevState => ({ 
        editContent : {  
          ...prevState.editContent , 
            data : data  
      } }))

    }
    else if (source === 'comment') { 
      this.setState(  { 
        newCommentContent: data 
      })
    }
    else if (source === 'reply') { 
      this.setState({ 
        newReplyContent : data 
      })
    }
    else { 
      this.setState({ newData : data })

    }

  }

  clickedReplyBtn = (commentID , replyID = null ) => {
    this.setState({showReplyBlock : commentID , replyToID : replyID })
    }

  deleteModalHandler = (type , id ) => { 
    const modalState = {...this.state.deleteModal} 
    modalState.itemType = type ; 
    modalState.itemID = id 
    modalState.show  = !modalState.show 
    this.setState({deleteModal : modalState})

  }

  cancelOrDeleteHandler = (action) => { 
    if(action ==='delete') { 
      const type = this.state.deleteModal.itemType
      const id = this.state.deleteModal.itemID
      
          if (type === 'comment') { 
            const comments =[ ...this.state.comments ]  ; 
            const commentIndex = comments.findIndex (comment => comment.id === id )
            comments.splice(commentIndex , 1)
            this.setState({comments : comments })
            this.deleteModalHandler(null , null )
          }
          else if (type ==='reply') { 
            const comments  = [...this.state.comments]
            const commentRepliedToIndex = comments.findIndex(comment =>  ( comment.replies.find( reply => reply.id === id ) ))
            const replyIndex = comments[commentRepliedToIndex].replies.findIndex(reply => reply.id === id)
            
            comments[commentRepliedToIndex].replies.splice(replyIndex, 1 ) 
            this.deleteModalHandler(null , null )



          }
          else { 
            console.log('type not found')
          }
          
        }
    else if (action === 'cancel' ) { 
      this.deleteModalHandler(null , null )

    }
  }

  editContentHandler = ( contentType , commentID , replyID) => { 
    
    const comments = [...this.state.comments]  
    const comment = comments.find( comment => comment.id === commentID)

    
    
    let data = '' ; 
    
    switch(contentType) { 
      case 'comment' : 
            data = comment.content ; 
            break ;  
      case 'reply' :
            const commentIndex = comments.findIndex(comment => comment.id === commentID) ; 
            const reply = comments[commentIndex].replies.find(reply => reply.id === replyID) ; 
            const replyTo = comments[commentIndex].user.username ; 
            data = `@${replyTo} ${reply.content}`
            break ; 
      default : 
          console.log('comment type not found')  
    }
    this.setState( prevState => ({ 
      
      editContent : { 
        type : contentType , 
        commentID : commentID , 
        show : !prevState.editContent.show  , 
        data : data , 
        replyId : replyID
        }, 
    })) 

   
  }

  

  updateCommentsHandler = ( ) => { 
    const comments = [...this.state.comments]
    const editContent=  {...this.state.editContent }
    
    const comment = comments.find(comment => comment.id === editContent.commentID ) 
    const commentIndex = comments.findIndex(comment => comment.id === editContent.commentID ) 
   
    if (editContent.type === 'comment') {
        comments[commentIndex].content  = editContent.data 
        this.setState(prevState => ({
            comments : comments ,
            editContent : {...prevState.editContent , data : '' , show : !prevState.editContent.show }}))

    }
    else if (editContent.type === 'reply') { 
        const replyIndex  = comment.replies.findIndex(reply => reply.id === editContent.replyId)
        const newContent = editContent.data.split(' ').filter(item => item !== `@${comment.user.username}`).join(' ')
              comment.replies[replyIndex].content  =  newContent

            this.setState( prevState => ( { 
            comments : comments , 
            editContent : {...prevState.editContent , data : '' , show : !prevState.editContent.show }
          }))
    }
    }

  componentDidUpdate(){ 
    localStorage.setItem('data', JSON.stringify(this.state))
    console.log('state after' , this.state )

  }

  shouldComponentUpdate(nextProps , nextState) { 
    // if ( this.state.currentUser === nextState.currentUser && 
    //       this.state.comments === nextState.comments  && 
    //       nextState.showReplyBlock === this.state.showReplyBlock ) { 
    //    return false 
    // }
    return true 

  }

  render (){ 
    
    const comments = [...this.state.comments]
    
    const user= {...this.state.currentUser} 

    return( 
      <div className='wrapper'> 
        <Comments 
          comments={comments} 
          vote={this.voteHandler}  
          user={user} 
          addComment={this.addCommentHandler} 
          changeInput={this.inputChangeHandler} 
          clickReplyBtn={this.clickedReplyBtn } 
          showReply={this.state.showReplyBlock}
          modalHandler = {this.deleteModalHandler}
          commentValue = {this.state.newCommentContent}
          replyValue = {this.state.newReplyContent}
          editHandler = {this.editContentHandler}
          showEdit ={this.state.editContent}
          updateComment = {this.updateCommentsHandler}
          timeStampConverter ={this.convertTimestamp}
          /> 
          <Backdrop show={this.state.deleteModal.show} click={this.deleteModalHandler}
          />
          <Modal  show={this.state.deleteModal.show}  action={this.cancelOrDeleteHandler} />
      </div>
    )
  }
}

export default App;
