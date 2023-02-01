import React, {useContext} from 'react'
import { ActionContext } from './ActionContext'
import styles from '../Style.scss'
import { getAvatarUrl } from '../functions' 
import ProfilePopUp from './ProfilePopUp'

const AvatarLink = ({
    otherUserId, name, avatarNum, children
}) => { 

    const actions = useContext(ActionContext)

    return (
        <a 
            href={actions.userId && actions.userId === otherUserId ? '/profile' : 
                `/userProfile/${otherUserId}`
            } 
            className={styles.commentsTwo}
            style = {{textDecoration : 'none', cursor:'default'}}
        >
        <ProfilePopUp
          otherUserId = {otherUserId}
          name = {name}
          avatarUrl = {
            getAvatarUrl(actions.userId, actions.userImg, otherUserId, avatarNum, actions.bucketUrl)
          }
        >
            {children}
        </ProfilePopUp>
        </a>
    )
}

export default AvatarLink