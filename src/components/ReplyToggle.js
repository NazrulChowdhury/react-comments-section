import React, { useEffect, useContext } from 'react'
import { ActionContext } from './ActionContext'

const ReplyToggle = ({
  comment, showRepliesCommentId, setShowRepliesCommentId, 
  showOption // this boolean option is for "-show" button.
}) => {
  const actions = useContext(ActionContext)
  
  useEffect(() => {
    if(actions.relevantComments){
      setShowRepliesCommentId([...showRepliesCommentId ,comment.comId])
    }
  },[])
  return (
    <div>
      {
        comment.replies?.length && showOption &&
        !showRepliesCommentId.find(id => id === comment.comId)?
        (<span 
          onClick={()=> setShowRepliesCommentId([...showRepliesCommentId ,comment.comId])}
          style = {{color : 'gray', fontSize : '12px', cursor : 'pointer'}}
        >
          — show {comment.replyCount} {" "} {comment.replyCount === 1? 'reply' : 'replies' }
        </span>) 
        : null
      }
      {   showRepliesCommentId.length && 
        showRepliesCommentId.find(id => id === comment.comId) ?
        (<span 
          onClick={()=> {
            setShowRepliesCommentId(showRepliesCommentId.filter(id => id !== comment.comId))}
          }
          style = {{color : 'gray', fontSize : '12px', cursor : 'pointer'}}
        > {
            comment.replies.length ? (
              <span>
                — hide {" "} {comment.replies.length === 1? 'reply' : 'replies' }
              </span>) : null
          }
        </span>) : null
      }
    </div>
  )
}

export default ReplyToggle;