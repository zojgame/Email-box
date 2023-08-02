import { RightOutlined } from "@ant-design/icons";
import { message, Button, Modal, Select } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { emailsStore } from "../../store/store";

/**
 * Компонент для перемещния выбранных писем в другую папку
 * Содержит также модальное окно для выбора папки перемещения
 * @returns {JSX.Element} Возвращает React компонент
 */
const MoveEmailsButton = observer(() => {
    const [isModal, setIsModal] = useState(false)
    const [folderId, setFolderId] = useState('1')
    const isDisable = emailsStore.selectedMails.length === 0;

    const handleOnCancelButtonClick = () => {
        setIsModal(false)
    }

    const handleOnOkButtonClick = () => {
        if(emailsStore.currentFolder.key !== folderId){
            emailsStore.moveMessages(folderId)
            message.success('Сообщения успешно перемещены!')
            setIsModal(false)
        }
        else{
            message.error('Сообщения уже находятся в папке!')
            setIsModal(false)
        }
    }

    const handleOnButtonClick = () => {
        setIsModal(true)
    }

    const handleOnFolderChange = (value: string) => {
        if(value){
            setFolderId(value)
        }
    }

    return(
        <>
            <Button disabled={isDisable} onClick={handleOnButtonClick}>Переместить <RightOutlined /></Button>
            <Modal open={isModal}
                onCancel={handleOnCancelButtonClick}
                onOk={handleOnOkButtonClick}
                title='Переместить письма в папку'>
                    <Select style={{ width: 120 }} 
                        defaultValue={`${emailsStore.currentFolder.label}`}
                        onChange={handleOnFolderChange}>
                        {emailsStore.folders.map((folder) => {
                            return (<Select.Option key={folder.key}>{folder.label}</Select.Option>)
                        })}
                    </Select>           
            </Modal>
        </>
    )
})

export {MoveEmailsButton}