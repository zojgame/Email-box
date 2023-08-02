import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { emailsStore } from "../../store/store";
import { DataType } from "..";
import { observer } from "mobx-react-lite";

interface DeleteMessageButtonProps {
    record : DataType
}

/**
 * Кнопка удаление сообщения
 * @returns {JSX.Element} Возвращает компонент
 */

const DeleteMessageButton = observer(({record} : DeleteMessageButtonProps) => {
    const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation()        
        emailsStore.deleteMessage(record.key)
    }      

    return (
      <Button className='button-delete' onClick={handleOnClick}>
        <DeleteOutlined className="icon"/>        
      </Button>
  )
})

export {DeleteMessageButton} 