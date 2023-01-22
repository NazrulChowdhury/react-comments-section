import React, { useContext } from 'react'
import InputField from './InputField'
import { ActionContext } from './ActionContext'

const Input = () => {
  const action = useContext(ActionContext)
  return action.customInput ? (
    action.customInput({
      authorImg: action.userImg,
      main: true,
      handleCancel: action.handleCancel,
      submit: action.submit
    })
  ) : (
    <InputField  
      main 
      isReply = {false}
    /> 
  )
}

export default Input
