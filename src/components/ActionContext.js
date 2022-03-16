import React, { createContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { processLike } from './processLike'

export const ActionContext = createContext()
export const ActionProvider = ({
  children,
  currentUser,
  setComment,
  comments,
  signinUrl,
  signupUrl,
  signInFunc,
  customInput,
  handleLike,
  handleUnlike
}) => {
  const [replies, setReplies] = useState([])
  const [user, setUser] = useState('')
  const [editArr, setEdit] = useState([])

  useEffect(() => {
    if (currentUser) {
      setUser(true)
    } else {
      setUser(false)
    }
  })

  const handleAction = (id, edit) => {
    if(!user){
      signInFunc()
      return
    }
    edit ? setEdit([...editArr, id]) : setReplies([...replies, id])
  }
  const likeTrigger = (id,parentId) => {
    if(!user){
      signInFunc()
      return
    }
    // to post data to the backend 
    // handleLike()
    // to update data on the frontend
    const newComments = processLike(id,parentId,comments)
    setComment(newComments)
  }
  const unlikeTrigger = (id) =>{
    handleUnlike()
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

  const onSubmit = (text, parentId, child) => {
    if (text.length > 0) {
      if (!parentId && !child) {
        setComment([
          ...comments,
          {
            userId: currentUser.userId,
            comId: uuid(),
            avatarUrl: currentUser.avatarUrl,
            fullName: currentUser.name,
            text: text
          }
        ])
      } else if (parentId && child) {
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        newList[index].replies.push({
          userId: currentUser.userId,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullName: currentUser.name,
          text: text
        })
        setComment(newList)
      } else if (parentId && !child) {
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        const newReplies =
          newList[index].replies === undefined
            ? []
            : [...newList[index].replies]
        newReplies.push({
          userId: currentUser.userId,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullName: currentUser.name,
          text: text
        })
        newList[index].replies = newReplies
        setComment(newList)
      }
    }
  }

  const editText = (id, text, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === id)
      newList[index].text = text
      setComment(newList)
    } else if (parentId !== undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const replyIndex = newList[index].replies.findIndex((i) => i.comId === id)
      newList[index].replies[replyIndex].text = text
      setComment(newList)
    }
  }

  const deleteText = (id, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments]
      const filter = newList.filter((x) => x.comId !== id)
      setComment(filter)
    } else if (parentId !== undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const filter = newList[index].replies.filter((x) => x.comId !== id)
      newList[index].replies = filter
      setComment(newList)
    }
  }

  const submit = (cancellor, text, parentId, edit, setText, child) => {
    if (edit) {
      editText(cancellor, text, parentId)
      handleCancel(cancellor, edit)
      setText('')
    } else {
      onSubmit(text, parentId, child)
      handleCancel(cancellor)
      setText('')
    }
  }

  return (
    <ActionContext.Provider
      value={{
        onSubmit: onSubmit,
        userImg: currentUser && currentUser.avatarUrl,
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
        signinUrl: signinUrl,
        signupUrl: signupUrl,
        user: user,
        customInput: customInput,
        submit: submit
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
