import React from 'react'

function Message({message, id}) {
    return (
        <div className={['message', id === message.id ? 'myMessage': 'otherMessage'].join(' ')}>
            <span >{message.body}</span>
        </div>
    )
}

export default Message
