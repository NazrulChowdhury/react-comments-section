import React, { useEffect, useState } from 'react'
import styles from './Style.scss'
import DisplayComments from './components/DisplayComments'
import { ActionProvider } from './components/ActionContext'
import SignField from './components/SignField'
import Input from './components/Input'

export const CommentSection = ({
  commentsArray,
  currentUser,
  userDocument, 
  setUserDocument,
  bookId,
  setComment, // only for bookComment section. not for comment cards
  signinUrl,
  signupUrl,
  signInFunc,
  customInput,
  handleLike,
  handleComment,
  handleEdit,
  handleDelete,
  commentLimit,
  handleFollow,
  CommentMain, // if true then main-comment-input section will be rendered.
  bucketUrl, // avatar image bucket address
  marginTop, // accommodate some margin-top for each comment if necessary 
  sectionTop,  // margin-top of the entire comment section. zero or 1px better for individual comment card.
  sectionLeft, // entire comment section. Adjust at will for individual comment 
  showReplyLoader,
  fetchReplies,
  onOpen, // triggers custom modal to open
  setFollowModalUserData,
  getProfile,
  followUserData,
  setFollowUserData 
}) => {
  const [comments, setComments] = useState(commentsArray)
  useEffect(() => {
    setComments(commentsArray)
  }, [commentsArray])

  return (
    <ActionProvider
      currentUser={currentUser}
      userDocument = {userDocument}
      setUserDocument = {setUserDocument}
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
      handleFollow = {handleFollow}
      commentLimit = {commentLimit}
      bucketUrl = {bucketUrl}
      marginTop = {marginTop} // to create gap between two comments. not between replies.
      onOpen = {onOpen}
      setFollowModalUserData = {setFollowModalUserData}
      getProfile = {getProfile}
      followUserData = {followUserData} // user obj array with follower counts
      setFollowUserData = {setFollowUserData}
    >
      <div className={styles.section}>
        <div className={styles.inputBox}>
          {CommentMain ? (!currentUser ? <SignField /> : <Input />) : null}
        </div>
        <div 
          className={styles.displayComments}
          style = {{marginTop : sectionTop || '18px', marginLeft : sectionLeft || '38px'}}
        >
          <DisplayComments 
            comments={comments} 
            fetchReplies = {fetchReplies}
            showReplyLoader ={showReplyLoader} 
          />
        </div>
      </div>
    </ActionProvider>
  )
}
