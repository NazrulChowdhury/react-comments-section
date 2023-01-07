import React from 'react'

const DeletedComment = ({ type }) => { // type = comment | reply
  return (
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
      {`${type} was deleted`}
    </div>
  )
}

export default DeletedComment



