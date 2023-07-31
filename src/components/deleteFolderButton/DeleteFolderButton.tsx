import { DeleteOutlined } from "@ant-design/icons";
import { message, Button, Modal } from "antd";
import { useState } from "react";
import { emailsStore } from "../../store/store";

const DeleteFolderButton = () => {
    const [isModal, setIsModal] = useState(false);

    const handleOnDeleteButtonClick = () => {
        setIsModal(true)
    }
    
    const handleOnOkButtonClick = () => {
        if(emailsStore.folders.length < 1){
            message.error('Папок не может быть меньше 1')
        }
        else{
            emailsStore.deleteFolder()
            setIsModal(false)
        }
    }
    
    const handleOnCancelButtonClick = () => {
        setIsModal(false)
    }
    
   return (
    <>
        <Button onClick={handleOnDeleteButtonClick}>Удалить папку <DeleteOutlined /></Button>
        <Modal open={isModal}
            onCancel={handleOnCancelButtonClick}
            onOk={handleOnOkButtonClick}
            title='Вы уверенны что хотите удалить данную папку?'>
                <p>Все содержащиеся письма в папке будут удалены</p>            
        </Modal>
    
    </>
   );
};

export {DeleteFolderButton}