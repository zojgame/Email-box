import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { emailsStore } from "../../store/store";
import { DataType } from "..";

interface DeleteMessageButton {
    record : DataType
}

const DeleteMessageButton = ({record} : DeleteMessageButton) => {
    const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation()        
        emailsStore.deleteMessage(record.key)
    }      

    return (
      <Button className='button-delete' onClick={handleOnClick}>
        <DeleteOutlined className="icon"/>        
      </Button>
  )
}

export {DeleteMessageButton} 