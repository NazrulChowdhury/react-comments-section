import React, { createContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { processLike } from './processLike'

export const ActionContext = createContext()
export const ActionProvider = ({
  children,
  currentUser,
  userDocument,
  setUserDocument,
  bookId,
  setComment,
  comments,
  signinUrl,
  signupUrl,
  signInFunc,
  customInput,
  handleLike,
  handleComment,
  handleEdit,
  handleDelete,
  handleFollow,
  commentLimit,
  marginTop, 
  bucketUrl,
  setFollowModalUserData,
  getProfile,
  followUserData,
  setFollowUserData,
  getFollowList,
  relevantComments,
  openDeleteModal,
  setDeleteModalData,
  useRating,
  showStarRating,
  replyFormLeftMargin,
  Avatar  
}) => {
  const [replies, setReplies] = useState([])
  const [user, setUser] = useState('')
  const [editArr, setEdit] = useState([])
  const [replyTargetUser, setReplyTargetUser] = useState('')
  const {userId} = currentUser

  useEffect(() => {
    if (currentUser) {
      setUser(true)
    } else {
      setUser(false)
    }
  },[currentUser])

  const handleAction = (comId, edit) => {
    if(!user){
      signInFunc()
      return
    }
    edit ? setEdit([...editArr, comId]) : 
    (
      setReplies([...replies, comId])
    )
  }

  const likeTrigger = (comId, parentId, targetUserId, text) => {
    if(!user){
      signInFunc()
      return
    } 
    const newComments = processLike(userId, comId, parentId, comments, 'like')
    setComment(newComments)
    // post to the backend
    handleLike(userId,'like', comId, parentId, targetUserId, text)
  }

  const unlikeTrigger = (comId,parentId) =>{
    const newComments = processLike(userId, comId, parentId, comments, 'unLike')
    setComment(newComments)
     //post to the backend 
     handleLike(userId,'unLike', comId, parentId)
  }
  
  const handleCancel = (id, edit) => {
    if (edit) {
      const list = [...editArr]
      const newList = list.filter((i) => i !== id)
      setEdit(newList)
    } else if (!edit) {
      const list = [...replies]
      const newList = list.filter((i) => i !== id)
      setReplies(newList)
    }
  }

  const onSubmit = (
    text, parentId, child, targetUserId, targetCommentId, replyTargetName
  ) => {
    let newComment = ''
    if (text.length > 0) {
      if (!parentId && !child) { // comment
        const commentObject = {
          userId: currentUser.userId,
          bookId,
          comId: uuid(),
          fullName: currentUser.name,
          text: text,
          likeCount: 0,
          likersId: [],
          createdAt : new Date(),
          edited : false,
          replyCount : 0
        }
        setComment([commentObject, ...comments])
        newComment = commentObject
      } else if (parentId && child) {  // reply
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        const replyObj = {
          userId: currentUser.userId,
          bookId,
          comId: uuid(),
          fullName: currentUser.name,
          text: text,
          likeCount: 0,
          likersId: [],
          replyTargetName : replyTargetName,
          replyTargetUserId : targetUserId,
          targetComId : targetCommentId,
          createdAt : new Date(),
          justPosted : true // check LoadReply.js for explanation of this field. 
        }
        parentId === targetCommentId ? newList[index].replies.unshift(replyObj) :
        newList[index].replies.push(replyObj)
        newList[index].replyCount++
        setComment(newList)
        newComment = filterOutField(replyObj, 'justPosted')
      } else if (parentId && !child) { // reply
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        const newReplies =
          newList[index].replies === undefined
            ? []
            : [...newList[index].replies]
        const replyObj = {
          userId: currentUser.userId,
          bookId,
          comId: uuid(),
          fullName: currentUser.name,
          text: text,
          likeCount: 0,
          likersId: [],
          replyTargetName : replyTargetName,
          replyTargetUserId : targetUserId,
          targetComId : targetCommentId,
          createdAt : new Date(),
          justPosted : true // check LoadReply.js for explanation of this field. 
        }
        parentId === targetCommentId ? newReplies.unshift(replyObj) :
        newReplies.push(replyObj)
        newList[index].replies = newReplies
        newList[index].replyCount++
        setComment(newList)
        newComment = filterOutField(replyObj, 'justPosted')
      }
      // post to backend
      handleComment(userId, parentId, targetUserId, targetCommentId, replyTargetName, newComment)
    }
  }

  const editText = (id, text, parentId, targetCommentId) => {
    if (parentId === undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === id)
      newList[index].text = text
      newList[index].edited = true
      setComment(newList)
    } else if (parentId !== undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const replyIndex = newList[index].replies.findIndex((i) => i.comId === id)
      newList[index].replies[replyIndex].text = text
      newList[index].replies[replyIndex].edited = true
      setComment(newList)
    }
    // post to backend
    handleEdit(userId, parentId, targetCommentId, text)
  }

  const deleteText = (id, parentId) => {
    if (parentId === undefined) { // delete comment
      const newList = [...comments]
      const filter = newList.filter((x) => x.comId !== id)
      setComment(filter)
    } else if (parentId !== undefined) { // delete reply
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const filter = newList[index].replies.filter((x) => x.comId !== id)
      newList[index].replies = filter
      newList[index].replyCount--
      setComment(newList)
    }
    handleDelete(userId, parentId, id) // call backend
  }

  const submit = (
    cancellor, text, parentId, edit, setText,targetUserId, 
    targetCommentId,replyTargetName, child
  ) => {
    if (edit) {
      editText(cancellor, text, parentId, targetCommentId)
      handleCancel(cancellor, edit)
      setText('')
    } else {
      onSubmit(text, parentId, child, targetUserId, targetCommentId, replyTargetName)
      handleCancel(cancellor)
      setText('')
    }
  }

  return (
    <ActionContext.Provider
      value={{
        onSubmit: onSubmit,
        userImg: currentUser && currentUser.image,
        userId: currentUser && currentUser.userId,
        handleAction: handleAction,
        handleCancel: handleCancel,
        likeTrigger : likeTrigger,
        unlikeTrigger : unlikeTrigger,
        replies: replies,
        setReplies: setReplies,
        editArr: editArr,
        onEdit: editText,
        onDelete: deleteText,
        handleFollow : handleFollow,
        signinUrl: signinUrl,
        signupUrl: signupUrl,
        signInFunc : signInFunc,
        user: user,
        userDocument : userDocument,
        setUserDocument : setUserDocument,
        customInput: customInput,
        submit: submit,
        commentLimit : commentLimit,
        marginTop :marginTop,
        bucketUrl : bucketUrl,
        setFollowModalUserData : setFollowModalUserData,
        getProfile : getProfile,
        followUserData : followUserData,
        setFollowUserData : setFollowUserData,
        getFollowList : getFollowList,
        relevantComments : relevantComments,
        openDeleteModal : openDeleteModal,
        setDeleteModalData : setDeleteModalData,  
        useRating : useRating,
        showStarRating : showStarRating,
        replyFormLeftMargin : replyFormLeftMargin,
        Avatar : Avatar
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}

function filterOutField(obj, field){
  return Object.keys(obj)
   .filter(key => key !== field)
   .reduce((acc, key) => {
     return {
       ...acc,
       [key]: obj[key]
     };
   }, {})
}