import React, { useContext, useState, useEffect } from 'react'
import styles from '../Style.scss'
import { ActionContext } from './ActionContext'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { FaUserCircle } from 'react-icons/fa'


const InputField = ({ cancellor, parentId, child, value, edit, main, replyTargetName, targetUserId, targetCommentId }) => {
  const actions = useContext(ActionContext)
  const schema = yup.object({
    comment: yup.string()
    .min(1, 'cannot submit empty!')
    .max(actions.commentLimit,`maximum ${actions.commentLimit} characters allowed! Try creating a thread instead.`)
    .required()
  }) 
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
  }
 
  useEffect(() => { 
    setText(value)
  }, [text])
  

  return (
    <div>
    <form
      className={styles.form}
      style={
        !child && !edit && main === undefined
          ? { marginLeft: 36 }
          : { marginLeft: 8 }
      }
    >
      <div className={styles.userImg}>
        {
          actions.userImg? (
            <img
              src={actions.userImg}
              style={{ width: 38, height: 38, borderRadius: 38 / 2 }}
              alt='userIcon'
            />
          ) : <FaUserCircle size = {38} style={{color : 'green'}} />
        } 
      </div>
      <input 
        {...register("comment")} 
        className={styles.postComment}
        placeholder='Type your reply here.'
      />
      {/* <textarea
        className={styles.postComment}
        //type='text'
        placeholder='Type your reply here.'
        //component='input'
        value={text} 
        // onChange={handleChange}
      /> */}
      <div className={styles.inputActions}>
        <button
          className={styles.postBtn}
          onClick={handleSubmit(onSubmit)}
          type='button'
          // disabled={!text}
          style={
            !text
              ? { backgroundColor: '#84dcff' }
              : { backgroundColor: '#30c3fd' }
          }
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
    <p style={{marginLeft : '20px', color : 'red'}}>{errors.comment?.message}</p>
    </div>
  )
}

export default InputField




