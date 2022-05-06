import React, { useContext } from 'react'
import styles from '../Style.scss'
import Popup from 'reactjs-popup'
import { BsReply } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai" 
import { MdOutlineDeleteOutline } from "react-icons/md" 
import { IoOptionsOutline } from "react-icons/io5"
import {
  modal,
  modalClose,
  modalHeader,
  modalContent,
  modalActions,
  modalActionBtn,
  modalDelBtn
} from './ModalStyles'
import { ActionContext } from './ActionContext'
import { toShortFormat } from '../functions'

const CommentStructure = ({ i, reply, parentId, replyTargetName}) => {
  const actions = useContext(ActionContext)
  const edit = true

  return (
    <div className={styles.halfDiv}>
      <div
        className={styles.userInfo}
        style={reply && { marginLeft: 15, marginTop: '6px' }}
      >

        {/* avatar/Name/Button flex-row */}
        <div className={styles.commentsTwo}>
           {/* avatar */}
          <div>
            <img
              src={i.avatarUrl}
              style={{ width: 24, height: 24, borderRadius: 24 / 2 }}
              alt='userIcon'
            />
          </div> 
            {/* fullName */}
          <div className={styles.fullName}>{i.fullName} </div>
        </div>
        {replyTargetName && 
        <div style={{fontSize : '12px', color : 'gray', marginBottom : '5px'}}>
          replying to{<b>{' '+replyTargetName}</b>} 
        </div>}
        <div>
           {/* comment */}
          {i.text}
          {/* buttons */}
          <div style={{display : 'flex', flexDirection: 'row'}}>
            <div>
              <button
                className={styles.customBtn}
                onClick={() => actions.handleAction(i.comId)}
                // disabled={!actions.user}
              >
                {' '}
                <span><BsReply size={20}/></span> 
                <span>reply</span> 
              </button>
              {'  '}
            </div>
            <div>
              <button
                className={styles.customBtn}
                onClick={() => {
                  if(actions.userId && i.likersId.find(id => id == actions.userId)){
                    actions.unlikeTrigger(i.comId, parentId)
                  } else{                 
                    actions.likeTrigger(i.comId, parentId, i.userId)
                  }
                }}
              >
                {' '}
                {actions.userId && i.likersId.length && i.likersId.find(id => id == actions.userId)?
                <span><AiFillHeart style={{color : 'red'}} size={20}/></span> :
                <span><AiOutlineHeart size={20}/></span>
                }             
                <span>{i.likeCount? i.likeCount : null}</span>
              </button>
            </div>
            <div>
              <button className={styles.customBtn} style={{color : 'gray'}}>
                {toShortFormat(i.createdAt)}
              </button>
            </div>
          </div>
        </div>
      </div>
        {/* edit button */}
      <div className={styles.userActions}>
        {actions.userId === i.userId && actions.user && (
          <Popup
            role='tooltip'
            trigger={
              <button className={styles.customBtn}>
                {/* <FontAwesomeIcon icon={faEllipsisV} size='1x' color='#b9b9b9' /> */}
                <IoOptionsOutline size={20}/>
              </button>
            }
            position='left center'
            nested
          >
            <div className={styles.actionDiv}>
              <div>
                <button
                  className={styles.editBtn}
                  onClick={() => actions.handleAction(i.comId, edit)}
                >
                  <span><BiEdit size={20}/> </span> 
                  <span>{'  '}edit</span>
                </button>
              </div>
              <div>
                <Popup
                  trigger={
                    <button className={styles.deleteBtn}>
                     <span> <MdOutlineDeleteOutline size = {20}/> </span>  
                     <span>{'  '}delete</span>
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div className='modal' style={modal}>
                      <button
                        className='close'
                        onClick={close}
                        style={modalClose}
                      >
                        &times;
                      </button>
                      <div className='header' style={modalHeader}>
                        {' '}
                        Delete Comment{' '}
                      </div>
                      <div className='content' style={modalContent}>
                        {' '}
                        Delete your comment permanently?
                      </div>
                      <div className='actions' style={modalActions}>
                        <button
                          className='button'
                          style={modalActionBtn}
                          onClick={() => {
                            actions.onDelete(i.comId, parentId)
                            close()
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className='button'
                          style={modalDelBtn}
                          onClick={() => {
                            close()
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </div>
  )
}

export default CommentStructure
