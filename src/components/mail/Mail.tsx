
import { Modal, Table } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'
import { columns, DataType, Email } from '..'
import { emailsStore } from '../../store/store'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

const convertToDataType = (emails : Email[]) => {
  const convertedData = emails.map((email) => {
    const data: DataType = {
      key: email.key,
      author: email.author,
      preview: `${email.message.slice(0, 150)}...`,
      data: email.data,
      title: email.title,
      fullText: email.message
    }

    return data
  })

  return convertedData
}

const convertToEmail = (data: DataType[]) => {
  const convertedData = data.map((d) => {
    const result : Email = {
      key: d.key,
      author: d.author,
      data: d.data,
      message: d.preview,
      title: d.title
    } 

    return result
  })

  return convertedData
}

interface MailProps {
  emails : Email[]
}

const Mail = observer(({emails} : MailProps) => {
  const [isModal, setIsModal] = useState(false)
  const [currentEmail, setCurrentEmail] = useState<DataType>()

  const selected = [...emailsStore.selectedMails].map((mail) => mail.key)

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (_selectedRowKeys, selectedRows) => {
      const convertedToEmail = convertToEmail(selectedRows)
        emailsStore.setSelectedEmails(convertedToEmail)
      },
  }

  const handleOnRow = (record : DataType) => {
    return {
      onClick: () => {
        setIsModal(true)
        setCurrentEmail(record)
      },
    };
  }

  const handleOnCancelButtonClick = () => {
    setIsModal(false)
  }

  const handleOnOkButtonClick = () => {
    setIsModal(false)
  }

  return (      
    <div>
      <Table
        style={{ padding: 24, minHeight: 360, cursor: 'pointer'}}
        rowSelection={{...rowSelection, selectedRowKeys: [...selected] }}
        onRow={handleOnRow}
        columns={columns}
        dataSource={[...convertToDataType(emails)]}             
      />
      <Modal 
        width={750}      
        open={isModal}
        onCancel={handleOnCancelButtonClick}
        onOk={handleOnOkButtonClick}
        title={currentEmail?.title}>
          <div className='full-message-block'>
            <div>
              <b>Автор:</b><div >{currentEmail?.author}</div>
            </div>
            <div>
              <b>Дата отправки:</b><div>{currentEmail?.data}</div>
            </div>
            <div>
              <b>Текст сообщения:</b><div>{currentEmail?.fullText}</div>
            </div>
          </div>
          
        </Modal>
    </div>
  )
})

export {Mail}
