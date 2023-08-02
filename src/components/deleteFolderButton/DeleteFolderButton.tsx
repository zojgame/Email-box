import { DeleteOutlined } from "@ant-design/icons";
import { message, Button, Modal } from "antd";
import { useState } from "react";
import { emailsStore } from "../../store/store";
import { folders } from "..";

/**
 * Кнопка удаление папок
 * @returns {JSX.Element} Возвращает компонент
 */

const DeleteFolderButton = () => {
    const [isModal, setIsModal] = useState(false);

    const handleOnDeleteButtonClick = () => {
        setIsModal(true)
    }
    
    const handleOnOkButtonClick = () => {
        const currentFolder = emailsStore.currentFolder
        const isMainFolder = folders.find((folder) => folder.key === currentFolder.key) !== undefined

        if(isMainFolder){
            message.error('Основные папки нельзя удалить!')
        }
        else{
            emailsStore.deleteFolder()
            setIsModal(false)
            message.success('Папка успешно удалена!')
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