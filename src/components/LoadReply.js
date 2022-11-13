import React from 'react'
import Spinner from './Spinner'

const LoadReply = ({showReplyLoader, comment}) => {
    return (
        <div style={{display : 'flex', justifyContent : 'center'}}>
            {showReplyLoader && <Spinner />}
            {
            comment.replies?.length < comment.replyCount && !showReplyLoader && (
                <div>
                <span
                    style = {{color : 'gray', fontSize : '12px', cursor : 'pointer'}}
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