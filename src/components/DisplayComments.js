import React, { useContext, useState } from 'react'
import styles from '../Style.scss'
import InputField from './InputField'
import { ActionContext } from './ActionContext'
// import 'reactjs-popup/dist/index.css'
import CommentStructure from './CommentStructure'
// import '../popup.css'
const DisplayComments = ({ comments }) => {
  const actions = useContext(ActionContext)
  const [showRepliesCommentId, setShowRepliesCommentId] = useState([])
  return (
    <div>
      {comments.map((i, index) => (
        <div key={i.comId}>
          {actions.editArr.filter((id) => id === i.comId).length !== 0 ? (
            actions.customInput ? (
              actions.customInput({
                cancellor: i.comId,
                value: i.text,
                handleCancel: actions.handleCancel,
                submit: actions.submit,
                edit: true
              })
            ) : (
              <InputField 
              cancellor={i.comId} 
              value={i.text} 
              edit 
              targetCommentId = {i.comId}
              marginTop = '5px'
              marginBottom = '5px'
              marginRight = '5px'
              />
            )
          ) : (
            <div> 
              <CommentStructure i={i} handleEdit={() => actions.handleAction} />
              {
                i.replies?.length && !showRepliesCommentId.find(id => id === i.comId)?
                (<span 
                  onClick={()=> setShowRepliesCommentId([...showRepliesCommentId ,i.comId])}
                  style = {{color : 'gray', fontSize : '12px', cursor : 'pointer'}}
                >
                  — show {i.replies.length} {" "} {i.replies.length == 1? 'reply' : 'replies' }
                </span>) 
                : null
              }
              {showRepliesCommentId.length && showRepliesCommentId.find(id => id == i.comId) ?
              (<span 
                onClick={()=> {
                  setShowRepliesCommentId(showRepliesCommentId.filter(id => id !== i.comId))}
                }
                style = {{color : 'gray', fontSize : '12px', cursor : 'pointer'}}
              > {
                  i.replies.length ? (
                    <span>
                      — hide {i.replies.length} {" "} {i.replies.length == 1? 'reply' : 'replies' }
                    </span>) : null
                }
              </span>) : null
              }
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
              />
            ))}

          <div className={styles.replySection}>
            {i.replies && 
              i.replies.map((a, index) => (
                <div key={a.comId}>
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
                      />
                    ))}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayComments
