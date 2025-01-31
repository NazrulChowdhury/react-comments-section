import React from 'react'
import styles from '../Style.scss'

const DeletedComment = ({ type }) => { // type = comment | reply
  return (
    <div 
      className={type === 'reply'? styles.replyBlocks : null}
    > 
      <div
        style={{
          background: 'lightgrey',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          margin: '5px',
          fontWeight: 'bold'
        }}
      >
        {`deleted ${type}`}
      </div>
    </div>
  )
}

export default DeletedComment



