import React from "react";

export default function Reducer(state=[], action){
    switch (action.type){
        case 'INITIALIZE_CHATS':
            return [
                ...state,
                action.payload
            ]
        case 'UPDATE_CHAT':
            let workingIndex = state.findIndex(x=>x.chatId == action.payload.chatId);
            console.log(workingIndex)
            if (workingIndex == -1){
                console.log('Chat not found from store')
                return state
            } else {
                // bug -- just updates the thread but doesn't do something to update/rerender the thread realtime
                let chat_to_update = {...state[workingIndex]}
                // do some deep copying to update the thread
                chat_to_update = {
                    ...chat_to_update,
                    thread: [
                        ...chat_to_update.thread,
                        action.payload.msg
                    ]
                }
                return [
                    ...state.slice(0, workingIndex),
                    chat_to_update,
                    ...state.slice(workingIndex+1)
                ]
            }
        case 'ADD_NEW_CHAT':
            return [
                ...state,
                action.payload
            ]
        case 'CLEAR_STORE':
            return []
        default:
            return state
    }
}