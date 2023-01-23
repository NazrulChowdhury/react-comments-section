import React,{useState, useEffect, useContext} from 'react'
import styles from '../Style.scss'
import { ActionContext } from './ActionContext'

const ProfilePopUp = ({
  otherUserId,
  avatarUrl,
  name,
  children
}) => {
  const {
    bucketUrl, signInFunc, handleFollow, getProfile, 
    userDocument, setUserDocument,
    onOpen, setFollowModalUserData, 
    followUserData, setFollowUserData,
    getFollowList, userId,
  } = useContext(ActionContext) 
  const [hover, setHover] = useState(false)
  const [following, setFollowing] = useState(undefined) // if you are following or not
  const [followData, setFollowData] = useState(undefined) // following and followers count
  const otherUserprofileUrl = `/userProfile/${otherUserId}`
  const  handleMouseEnter = ()=> setHover(true)
  const handleMouseLeave = () => setHover(false)
  const goToProfile = (e, userId) => {
    e.stopPropagation()
    e.preventDefault()
    if(!userDocument){
      signInFunc()
      return
    }
    getProfile(userId, userDocument)
  }

  useEffect(() => {
    setFollowing(userDocument?.followingIds?.find(id => { return id === otherUserId}))
  },[userDocument])
  useEffect(() => {
    setFollowData(followUserData.find(user => {return user.userId === otherUserId}))
  },[followUserData])

  return (
    <div className = {styles.tooltip}>
      {children}
      <div className = {styles.tooltipProfile} >
        <div style={{display:'flex', justifyContent : 'space-between', alignItems:'center'}}>
          <a href={userId && userId === otherUserId ? '/profile' : otherUserprofileUrl}>
            <img
              src = {avatarUrl}
              style={{ width: 60, height: 60, borderRadius: 60 / 2, cursor:'pointer', marginLeft:'10px', marginTop : '5px' }}
              alt='userIcon'
              onClick = {(e) => goToProfile(e, otherUserId)}
            />
          </a>
          <div style={{marginRight : '15px'}}> 
            { following &&
              <button
                className={styles.standardBtn}
                style = {{ 
                  color : hover ? 'red' : 'teal',
                  backgroundColor: '#cdf7d3'
                }}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                onClick = {(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setFollowModalUserData({
                    name ,
                    userId : otherUserId
                  })
                  onOpen()
                }}
              >
                {hover ? `Unfollow` : 'Following' }
              </button>
            }
          
            { !following &&
              <button
                className={styles.standardBtn}
                onClick = {(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  if(!userDocument){
                    signInFunc()
                    return
                  }
                  handleFollow( userDocument.userId, otherUserId, 'follow')
                  setUserDocument({
                    ...userDocument,
                    followingIds : [...userDocument.followingIds, otherUserId]
                  })                 
                  const updatedFollowUserData = followUserData.map(user =>{
                    if(user.userId === otherUserId){ 
                      return {
                        ...user,
                        followers : user.followers + 1
                      }
                    }
                    if(user.userId === userId){ 
                      return {
                        ...user,
                        following : user.following + 1
                      }
                    }
                    return user
                  } )
                  setFollowUserData(updatedFollowUserData)
                }}
              >
                Follow
              </button>
            } 
          </div>         
        </div>
        <div style={{marginLeft : '10px', display:'flex', flexDirection:'column'}}>
          <a 
            href={userId && userId === otherUserId ? '/profile' : otherUserprofileUrl}
            style = {{cursor:'default', textDecoration : 'none'}}
            onClick = {(e) => {e.preventDefault()}}
          >
            <span
              onClick = {(e) => goToProfile(e, otherUserId)}
              style = {{cursor:'pointer'}}
            >
              <b>{name}</b>
            </span>
          </a>
          {userDocument?.followersIds.find(id => {return id === otherUserId}) ? (
          <span style={{fontSize : '10px',width:'60px', textAlign:'center', border : '1px solid white',marginTop:'5px'}}>
            Follows you
          </span>) : null
          }
          <div style={{display:'flex', marginTop:'5px',fontSize : '13px'}}>
            <div className = {styles.underline}
              onClick = {(e) => {
                e.stopPropagation()
                e.preventDefault()
                if(!userDocument){
                  signInFunc()
                  return
                }
                const nameWithDash = name.replaceAll(' ', '-')
                getFollowList(otherUserId , nameWithDash, 'following', followData.followers, followData.following)
              }}
            >
              <div >
                <b>{followData && followData.following}</b>
              </div>
              <span style={{marginLeft : '2px', marginRight : '10px'}}>following</span>
            </div>
            <div className = {styles.underline}
              onClick = {(e) => {
                e.stopPropagation()
                e.preventDefault()
                if(!userDocument){
                  signInFunc()
                  return
                }
                const nameWithDash = name.replaceAll(' ', '-')
                getFollowList(otherUserId , nameWithDash, 'followers', followData.followers, followData.following)
              }}
            >
              <div>
                <b>{followData && followData.followers}</b>
              </div>
              <span style={{marginLeft : '2px'}}>followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePopUp