const generateNotificationMessage = (admin_id, user_id) =>{
    return {
        type: 'template',
        altText: 'チャットメッセージを受信しました',
        template: {
            type: 'buttons',
            text: 'チャットメッセージを受信しました',
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