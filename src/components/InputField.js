import React, { useContext, useState, useEffect } from 'react'
import styles from '../Style.scss'
import { ActionContext } from './ActionContext'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const InputField = ({ 
  cancellor, parentId, child, value, edit, main, replyTargetName, targetUserId, targetCommentId, 
  marginTop, marginRight, marginBottom, showRepliesCommentId, setShowRepliesCommentId, isReply
}) => {
  const [tooLong, setTooLong] = useState(false)
  const actions = useContext(ActionContext)
  const schema = yup.object({
    comment: yup.string()
    .min(1, 'cannot submit empty!')
    .max(actions.commentLimit,`maximum ${actions.commentLimit} characters allowed! Try creating a thread instead.`)
    .required()
  }) 
  const marginLeft = !child && !edit && main === undefined?  36 : 0 
  const [text, setText] = useState('')

  const { register, resetField, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues : {
      "comment" : edit? (value) : null
    }
  })
  const postForm = (data) => {
    edit === true
    ? actions.submit(cancellor, data.comment, parentId, true, setText, null, targetCommentId)
    : actions.submit(cancellor, data.comment, parentId, false, setText,targetUserId, targetCommentId,replyTargetName)
  }
  const onSubmit = (data) => {
    postForm(data)
    resetField("comment")
    if(showRepliesCommentId){
      const expanded = showRepliesCommentId.find(id => id === parentId)
      !expanded && setShowRepliesCommentId([...showRepliesCommentId, parentId])
    }
  }
 
  useEffect(() => { 
    setText(value)
  }, [text])
  

  return (
    <div>
    <form
      className={styles.form}
      style={{marginTop,marginBottom, marginLeft, marginRight, }}
    >
      <div style={{display:'flex'}}>
        <div className={styles.userImg}>
          <img
            src = {actions.userImg ? actions.userImg : `${actions.bucketUrl}/noImage.png`} 
            style={{ width: 38, height: 38, borderRadius: 38 / 2 }}
            alt='userIcon'
          /> 
        </div>
        <textarea
          {...register("comment")} 
          className={styles.postComment}
          placeholder={`Type your ${isReply ? 'reply' : 'comment / review'} here.`}
          onChange = {(e)=>{
            if(e.target.value.length >= actions.commentLimit) {
              !tooLong && setTooLong(true)
            }else{
              tooLong && setTooLong(false)
            }
          }}
          style = {{
            color : tooLong ? 'red' : null
          }}
        /> 
      </div>
      <div className={styles.inputActions}>
        <button
          className={styles.postBtn}
          onClick={handleSubmit(onSubmit)}
          type='button'
          // disabled={!text}
          // style={
          //   !text
          //     ? { backgroundColor: '#84dcff' }
          //     : { backgroundColor: '#30c3fd' }
          // }
        >
          Post
        </button>
        {(text || parentId) && (
          <button
            className={styles.cancelBtn}
            onClick={() =>
              edit
                ? actions.handleCancel(cancellor, edit)
                : actions.handleCancel(cancellor)
            }
          >
            Cancel
          </button>
        )}
      </div>
    </form>
    <p 
      style={{marginLeft : '20px', color : 'red'}}
    >
      { tooLong &&
        `maximum ${actions.commentLimit} characters allowed! Try creating a thread instead.`
      } 
    </p>
    </div>
  )
}

export default InputField




