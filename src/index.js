import React, { useEffect, useState } from 'react'
import styles from './Style.scss'
import DisplayComments from './components/DisplayComments'
import { ActionProvider } from './components/ActionContext'
import SignField from './components/SignField'
import Input from './components/Input'

export const CommentSection = ({
  commentsArray,
  currentUser,
  bookId,
  setComment,
  signinUrl,
  signupUrl,
  signInFunc,
  customInput,
  handleLike,
  handleComment,
  handleEdit,
  handleDelete,
  commentLimit
}) => {
  const [comments, setComments] = useState(commentsArray)
  useEffect(() => {
    setComments(commentsArray)
  }, [commentsArray])

  return (
    <ActionProvider
      currentUser={currentUser}
      bookId = {bookId}
      setComment={setComment}
      comments={comments}
      signinUrl={signinUrl}
      signupUrl={signupUrl}
      signInFunc = {signInFunc}
      customInput={customInput}
      handleLike = {handleLike}
      handleComment = {handleComment}
      handleEdit = {handleEdit}
      handleDelete = {handleDelete}
      commentLimit = {commentLimit}
    >
      <div className={styles.section}>
        <div className={styles.inputBox}>
          {!currentUser ? <SignField /> : <Input />}
        </div>
        <div className={styles.displayComments}>
          <DisplayComments comments={comments} />
        </div>
      </div>
    </ActionProvider>
  )
}
