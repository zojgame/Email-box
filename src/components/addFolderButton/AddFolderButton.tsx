import { PlusCircleOutlined } from "@ant-design/icons";
import { message, Button, Modal, Form, Input } from "antd";
import { nanoid } from "nanoid";
import { useState, ChangeEvent } from "react";
import { Folder } from "..";
import { emailsStore } from "../../store/store";

/**
 * Компонент кнопки добавления папки, содержит логику вызова модального окна
 * с вводом названия папки, и добавления этой папки в store
 * @returns {JSX.Element} Возвращает компонент кнопки
 */

const AddFolderButton = () => {
    const [isModalAddFolder, setIsModalAddFolder] = useState(false)
    const [folderInput, setFolderInput] = useState('')
    const [form] = Form.useForm()

    const isFolderExists = emailsStore.folders.find((folder: Folder) => folder.label === folderInput) !== undefined

    const handleOnAddFolderClick = () => {
        setIsModalAddFolder(true)
    }

    const handleAddFolderCancel = () => {
        setIsModalAddFolder(false)
        setFolderInput('')
        form.resetFields()
    }

    const handleAddFolderChange = (event: ChangeEvent<HTMLInputElement>) => {        
        setFolderInput(event.target.value)
    }

    const handleAddFolderSubmit = () => {
        if(folderInput.length < 2){
            message.error('Название слишком короткое!')
        }
        else if(isFolderExists){
            message.error('Папка с данным названием уже существует!')
        }
        else{
            const createdFolder : Folder= {
                label: folderInput,
                key: nanoid(),
                messages: []
            }

            emailsStore.createFolder(createdFolder)
            message.success('Папка успешно создана!')
            setIsModalAddFolder(false)
            setFolderInput('')
            form.resetFields()
        }
        
    }

   return (
    <>
        <Button onClick={handleOnAddFolderClick}>Добавить папку <PlusCircleOutlined /></Button>
        <Modal open={isModalAddFolder}
            onCancel={handleAddFolderCancel}
            title='Создание папки'
            footer={null}>
            <Form
                form={form}
                onFinish={handleAddFolderSubmit}
                name="basic"
                autoComplete="off">
                <Form.Item
                    label="Название"
                    name="title"
                    rules={[{ required: true, message: 'Пожалуйста введите название' }]}
                >
                    <Input onChange={handleAddFolderChange}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Подтвердить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
        
   );
};

export {AddFolderButton}