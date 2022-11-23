import React,{useState, useEffect, useContext} from 'react'
import styles from '../Style.scss'
import { ActionContext } from './ActionContext'

const ProfilePopUp = ({
  otherUserId,
  name,
  children
}) => {
  const {
    bucketUrl, handleFollow, 
    userDocument, setUserDocument,
    onOpen
  } = useContext(ActionContext) 
  const [hover, setHover] = useState(false)
  const [following, setFollowing] = useState(undefined)

  const  handleMouseEnter = ()=> setHover(true)
  const handleMouseLeave = () => setHover(false)

  useEffect(() => {
    setFollowing(userDocument?.followingIds?.find(id => { return id === otherUserId}))
  },[userDocument])

  return (
    <div className = {styles.tooltip}>
      {children}
      <div className = {styles.tooltipProfile}>
        <div style={{display:'flex', justifyContent : 'space-evenly', alignItems:'center'}}>
          <img
            src = {`${bucketUrl}/${otherUserId}.jpeg?`}
            style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
            alt='userIcon'
            onError={(e) => {
              e.target.onerror = null; // prevents looping
              e.target.src =`${bucketUrl}/noImage.png`
            }}
          /> 
          { following &&
            <button
              className={styles.standardBtn}
              style = {{ color : hover ? 'red' : 'teal'}}
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              //onClick = {actions.onOpen} set body text + set modal action type (comment, follow) + ...args
              onClick = {() => {
                onOpen()
              }}
            >
              {hover ? `Unfollow` : 'Following' }
            </button>
          }
          { !following &&
            <button
              className={styles.standardBtn}
              onClick = {() => {
                  handleFollow( userDocument.userId, otherUserId, 'follow')
                  setUserDocument({
                    ...userDocument,
                    followingIds : [...userDocument.followingIds, otherUserId]
                  })
                }
              }
            >
              Follow
            </button>
          }          
        </div>
        <span>{name}</span>
      </div>
    </div>
  )
}

export default ProfilePopUp