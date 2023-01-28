import React, { useContext, useEffect, useState } from 'react'
import styles from '../Style.scss'
import Popup from 'reactjs-popup'
import { BsReply } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"
import { CgEditUnmask } from "react-icons/cg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai" 
import { MdOutlineDeleteOutline } from "react-icons/md" 
import { ActionContext } from './ActionContext'
import { toShortFormat, getAvatarUrl } from '../functions'
import ProfilePopUp from './ProfilePopUp'

const CommentStructure = ({ i, reply, parentId, replyTargetName}) => {
  const actions = useContext(ActionContext)
  const edit = true
  const marginTop = actions.marginTop? actions.marginTop : '16px'
  const [partialText, setPartialText] = useState('')

  useEffect(()=>{
    i.text.length > 350 && setPartialText(i.text.slice(0,350)) 
  },[i.text])

  return (
    <div 
      className={styles.halfDiv}
      style = {!reply ? {marginTop} : null}
    >
      <div
        className={styles.userInfo}
        style={reply ? { marginLeft: 15, marginTop: '6px' } : {marginTop : '0px'}}
      >

        <ProfilePopUp
          otherUserId = {i.userId}
          name = {i.fullName}
          avatarUrl = {
            getAvatarUrl(actions.userId, actions.userImg, i.userId, i.avatarNum, actions.bucketUrl)
          }
        >
          {/* avatar/Name/Button flex-row */}
          <a 
            href={actions.userId && actions.userId === i.userId ? '/profile' : 
              `/userProfile/${i.userId}`
            } 
            className={styles.commentsTwo}
            style = {{cursor: 'pointer', textDecoration : 'none'}}
          >
            {/* avatar */}
            <img
              src = {
                getAvatarUrl(actions.userId, actions.userImg, i.userId, i.avatarNum, actions.bucketUrl)
              } 
              style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
              alt='userIcon'
              onError={(e) => {
                e.target.onerror = null; // prevents looping
                e.target.src =`${actions.bucketUrl}/noImage.png`
              }}
              onClick = {(e) => {
                e.stopPropagation()
                e.preventDefault()
                actions.getProfile(i.userId, actions.userDocument)
              }}
            />           
              {/* fullName */}
            <div 
              className={styles.fullName}
              onClick = {(e) => {
                e.stopPropagation()
                e.preventDefault()
                actions.getProfile(i.userId, actions.userDocument)
              }}
            >
              {i.fullName} 
            </div>
          </a>
        </ProfilePopUp>
        {replyTargetName && 
        <div style={{fontSize : '12px', color : 'gray', marginBottom : '5px'}}>
          replying to{<b>{' '+replyTargetName}</b>} 
        </div>}
        <div style = {{marginTop : '10px'}}>
           {/* comment */}
          { 
            partialText ?(
              <div>
                {`${partialText} `} 
                <button
                  className={styles['continue-btn']}
                  onClick={() => setPartialText('')}
                >
                  <span
                    style={{marginLeft : '5px', marginRight : '5px'}}
                  >
                    Continue reading ...
                  </span>
                </button>
              </div>
            ) : i.text
          }
          {/* buttons */}
          <div style={{display : 'flex', flexDirection: 'row',marginTop : '10px'}}>
            <div style={{display: 'flex', alignItems:'center' }}>
              {i.edited? <b style={{fontSize : '12px', color : 'gray', marginRight : '5px'}}>{'Edited'}</b> : null}
            </div>
            <div>
              <button
                className={styles.customBtn}
                onClick={() => actions.handleAction(i.comId)}
                style = {{cursor : 'pointer', marginRight : '10px'}}
                // disabled={!actions.user}
              >
                {' '}
                <span><BsReply size={20}/></span> 
                <span>reply</span> 
              </button>
              {'  '}
            </div>
            <div> {/* like Div */}
              <button
                style = {{
                  cursor : 'pointer', marginRight : '10px',  background: 'transparent',
                  display: 'flex', alignItems:'center'
                }}
                onClick={() => {
                  if(actions.userId && i.likersId.find(id => id == actions.userId)){
                    actions.unlikeTrigger(i.comId, parentId)
                  } else{                 
                    actions.likeTrigger(i.comId, parentId, i.userId, i.text)
                  }
                }}
              >
                {' '}
                <span 
                  className={styles.heartBtn}
                >
                  {actions.userId && i.likersId.length && i.likersId.find(id => id == actions.userId)?
                    <AiFillHeart style={{color : 'red'}} size={20}/> :<AiOutlineHeart size={20}/>
                  }
                </span>             
                <span style={{fontSize : '10px'}}>{i.likeCount? i.likeCount : null}</span>
              </button>
            </div>
            <div style={{display : 'flex', alignItems : 'center'}}>
              <button className={styles.dateBtn} style={{color : 'gray', cursor:'default', fontSize:'12px'}}>
                {toShortFormat(i.createdAt)}
              </button>
            </div>
          </div>
        </div>
      </div>
        {/* edit button */}
      <div 
        className={styles.userActions}
        style = {{cursor : 'pointer'}}
      >
        {actions.userId === i.userId && actions.user && (
          <Popup
            role='tooltip'
            trigger={
              <button className={styles.optionBtn}>
                {/* <FontAwesomeIcon icon={faEllipsisV} size='1x' color='#b9b9b9' /> */}
                <CgEditUnmask size={20}/>
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
                <button 
                  className={styles.deleteBtn}
                  onClick={() => {
                    actions.setDeleteModalData({
                      parentId,
                      targetCommentId: i.comId
                    })
                    actions.openDeleteModal()
                  }}
                >
                  <span> <MdOutlineDeleteOutline size = {20}/> </span>  
                  <span>{'  '}delete</span>
                </button>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </div>
  )
}

export default CommentStructure

