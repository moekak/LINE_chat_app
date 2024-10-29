const generateNotificationMessage = (admin_id, user_id, message) =>{
    return {
        type: 'template',
        altText: message,
        template: {
            type: 'buttons',
            text: message,
            actions: [
                {
                    type: 'uri',
                    label: 'チャットを確認',
                    uri: `https://line-chat.tokyo/chat/${admin_id}/${user_id}`
                }
            ]
        }
    }
}

module.exports ={
    generateNotificationMessage
}