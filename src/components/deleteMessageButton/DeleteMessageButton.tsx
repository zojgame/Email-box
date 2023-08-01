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
      <Button style={{textAlign: 'center', width: '50%', padding: '5px 0'}} onClick={handleOnClick}>
        <DeleteOutlined style={{fontSize: '20px'}}/>        
      </Button>
  )
}

export {DeleteMessageButton} 