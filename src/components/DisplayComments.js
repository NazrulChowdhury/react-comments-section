import React, { useContext, useState } from 'react'
import styles from '../Style.scss'
import InputField from './InputField'
import { ActionContext } from './ActionContext'
// import 'reactjs-popup/dist/index.css'
import CommentStructure from './CommentStructure'
import LoadReply from './LoadReply'
import ReplyToggle from './ReplyToggle'
import DeletedComment from './DeletedComment'
import { randomNum } from '../functions'
// import '../popup.css'
const DisplayComments = ({ comments, showReplyLoader, fetchReplies }) => {
  const actions = useContext(ActionContext)
  const [showRepliesCommentId, setShowRepliesCommentId] = useState([])

  return (
    <div>
      {comments.map((i, index) => (
        !Object.keys(i).length ? 
          <DeletedComment 
            type = 'comment' 
            key = {randomNum(10000, 1000000)}
          /> 
        : // only render the rest if comment has not been deleted. showRepliesCommentId, setShowRepliesCommentId
        <div key={i.comId}>
          {actions.editArr.filter((id) => id === i.comId).length !== 0 ? (
            actions.customInput ? (
              actions.customInput({
                cancellor: i.comId,
                value: i.text,
                handleCancel: actions.handleCancel,
                submit: actions.submit,
                edit: true
              })) : (
                <InputField 
                  cancellor={i.comId} 
                  value={i.text} 
                  edit 
                  targetCommentId = {i.comId}
                  marginTop = '5px'
                  marginBottom = '5px'
                  marginRight = '5px'
                  isReply = {true}
                />
              )
          ) : ( 
            <div> 
              <CommentStructure i={i} handleEdit={() => actions.handleAction} />
              <ReplyToggle 
                comment = {i} showRepliesCommentId = {showRepliesCommentId}
                setShowRepliesCommentId = {setShowRepliesCommentId}
                showOption = {true}
              />
            </div>
          )}


          {actions.replies.filter((id) => id === i.comId).length !== 0 &&
            (actions.customInput ? (
              actions.customInput({
                cancellor: i.comId,
                parentId: i.comId,
                submit: actions.submit,
                handleCancel: actions.handleCancel,
                edit: false
              })
            ) : (
              <InputField 
                cancellor={i.comId} 
                parentId={i.comId} 
                replyTargetName = {i.fullName} 
                targetUserId = {i.userId}
                targetCommentId = {i.comId}
                marginRight = '5px'
                showRepliesCommentId = {showRepliesCommentId}
                setShowRepliesCommentId = {setShowRepliesCommentId}
                isReply = {true}
              />
            ))}

          <div className={styles.replySection}>
            {i.replies && 
              i.replies.map((a, index) => (
                !a ? 
                  <DeletedComment 
                    type = 'reply' 
                    key = {randomNum(10000, 1000000)}
                  /> 
                : // only render if reply is not deleted.
                <div 
                  key={a.comId} 
                  className = {
                    showRepliesCommentId.length && showRepliesCommentId.find(id => id == i.comId) ? styles.replyBlocks
                    : null
                  }
                >
                  {actions.editArr.filter((id) => id === a.comId).length !==
                  0 ? (
                    actions.customInput ? (
                      actions.customInput({
                        cancellor: a.comId,
                        value: a.text,
                        handleCancel: actions.handleCancel,
                        edit: true,
                        parentId: i.comId,
                        submit: actions.submit
                      })
                    ) : (
                      <InputField
                        cancellor={a.comId}
                        value={a.text}
                        edit
                        parentId={i.comId}
                        targetCommentId = {a.comId}
                        marginRight = '5px'
                        marginBottom = '5px'
                        isReply = {true}
                      />
                    )
                  ) : (
                    showRepliesCommentId.length && showRepliesCommentId.find(id => id == i.comId) ? 
                      <CommentStructure
                        i={a}
                        reply
                        parentId={i.comId}
                        handleEdit={() => actions.handleAction}
                        replyTargetName = {a.replyTargetName? a.replyTargetName : null}
                      /> : null
                  )}
                  {actions.replies.filter((id) => id === a.comId).length !==
                    0 &&
                    (actions.customInput ? (
                      actions.customInput({
                        cancellor: a.comId,
                        parentId: i.comId,
                        child: true,
                        submit: actions.submit,
                        handleCancel: actions.handleCancel,
                        edit: false
                      })
                    ) : (
                      <InputField
                        cancellor={a.comId}
                        parentId={i.comId}
                        child
                        replyTargetName = {a.fullName}
                        targetUserId = {a.userId}
                        targetCommentId = {a.comId}
                        marginRight = '5px'
                        marginBottom = '5px'
                        showRepliesCommentId = {showRepliesCommentId}
                        setShowRepliesCommentId = {setShowRepliesCommentId}
                        isReply = {true}
                      />
                    ))}
                </div>
              ))}
              {
                showRepliesCommentId.find(id => id == i.comId) ?(
                <LoadReply 
                  showReplyLoader = {showReplyLoader} 
                  comment = {i}
                  fetchReplies = {fetchReplies}
                />) : null
              }
          </div>
          {/* <ReplyToggle 
            comment = {i} showRepliesCommentId = {showRepliesCommentId}
            setShowRepliesCommentId = {setShowRepliesCommentId}
            showOption = {false}
          /> */}
        </div>
      ))}
    </div>
  )
}

export default DisplayComments
