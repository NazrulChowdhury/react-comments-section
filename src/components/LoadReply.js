import React from 'react'
import Spinner from './Spinner'

const LoadReply = ({showReplyLoader, comment, fetchReplies}) => {
    const recentlyPostedReplies = comment.replies.reduce((acc, reply) => {
        reply?.justPosted &&  ++acc // acc is a number of new posted replies.
        return acc
    },0)
    return (
        <div style={{display : 'flex', justifyContent : 'center'}}>
            {showReplyLoader && <Spinner />}
            {
            comment.replies?.length < comment.replyCount && !showReplyLoader && (
                <div>
                    <span
                        style = {{color : 'gray', fontSize : '12px', cursor : 'pointer'}}
                        onClick = { () => {
                            fetchReplies({
                                comId : comment.comId, 
                                bookId : comment.bookId, 
                                fetchedReplyCount : comment.replies.length - recentlyPostedReplies
                            })}
                        }
                    >
                        load more replies 
                    </span>
                </div>
            )
            }
        </div>
    )
}

export default LoadReply;

/*
leaving a reply adds it on the client side and increases comment.replies.length.
if load more comment is clicked after leaving a reply, it sends the wrong reply count to the 
backEnd. some replies are missed. That's why recent reply posted by me need to be deducted from 
the reply count before backend call. 
*/