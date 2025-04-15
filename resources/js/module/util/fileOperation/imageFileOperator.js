import imageCompression from 'browser-image-compression';
import FileUploader from "../../util/fileOperation/FIleUploader";

export const isAllowedType = (fileType) =>{
    const allowedTypes = [
        'image/jpeg',
        'image/png',
    ];

    return allowedTypes.includes(fileType)
}


export const isCorrectSize = (fileSize) =>{
    const MAX_SIZE_MB = 5;
    return fileSize < MAX_SIZE_MB * 1024 *1024
}


export const processImageUpload = async (file, sender_id, receiver_id, sender_type) => {
    try {
        // 圧縮処理
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
            useWebWorker: true
        });

        // ファイル名生成
        const extension = file.name.split('.').pop();
        const newFileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${extension}`;

        // ID取得
        const user_id = sender_type == "user" ? sender_id : receiver_id;
        const admin_id = sender_type == "user" ? receiver_id : sender_id;

        // FormData作成
        const formData = new FormData();
        formData.append('image', compressedFile, newFileName);
        formData.append('user_id', user_id);
        formData.append('admin_id', admin_id);
        formData.append('type', 'user');

        return formData;

    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
};

export const handleImageProcessingFlow =  async (socket, sender_id, url, sender_type, file, index = null, isTemplate = false, fileInput = null)=>{

    const imageElement      =  document.getElementById("image")
    const fileUploader = new FileUploader(socket, sender_id, url, sender_type, file, imageElement,isTemplate, index, fileInput)
    
    await fileUploader.validateAndProcessFile ()

    if(isTemplate){
        return fileUploader.setupMessagesTemplateSubmitButton();
    }else{
        fileUploader.setupMessageSubmitButton();
    }
    
}