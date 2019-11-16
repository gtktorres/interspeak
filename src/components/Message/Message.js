import React from 'react';

import './Message.css';
import ReactEmoji from 'react-emoji';

const Message = ({ message: {user, text }, name }) => {
    let isSentCurrentUser = false;    

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentCurrentUser = true;
    }

    return(
        isSentCurrentUser
        ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className='messageBox backgtoundBlue'>
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>     //here

        )
        : (
            <div className="messageContainer justifyStart">
                <p className="sentText">{trimmedName}</p>
                <div className='messageBox backgtoundLight'>
                    <p className="messageText colorDark">{text}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div> 
        )
    )
}

export default Message;