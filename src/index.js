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
  commentLimit,
  CommentMain, // if true then main-comment-input section will be rendered.
  bucketUrl, // avatar image bucket address
  marginTop, // accommodate some margin-top for each comment if necessary 
  sectionTop  // margin-top of the entire comment section. zero or 1px better for individual comment card. 
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
      bucketUrl = {bucketUrl}
      marginTop = {marginTop} // to create gap between two comments. not between replies. 
    >
      <div className={styles.section}>
        <div className={styles.inputBox}>
          {CommentMain ? (!currentUser ? <SignField /> : <Input />) : null}
        </div>
        <div 
          className={styles.displayComments}
          style = {{marginTop : sectionTop || '18px'}}
        >
          <DisplayComments comments={comments} />
        </div>
      </div>
    </ActionProvider>
  )
}
