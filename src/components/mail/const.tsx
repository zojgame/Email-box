import { ColumnsType } from 'antd/es/table';
import { DataType, DeleteMessageButton } from '..';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const columns: ColumnsType<DataType> = [
  {
    title: 'Автор',
    dataIndex: 'author',
    render: (_value, record) => {
      const text = record.author;
      return <>{record.isRead ? <>{text}</> : <b>{text}</b>}</>
    }
  },
  {
    title: 'Превью',
    dataIndex: 'preview',
    width: '50%',
    render: (_value, record) => {
      const text = record.preview;
      return <>{record.isRead ? <>{text}</> : <b>{text}</b>}</>
    }
  },
  {
    title: 'Дата',
    dataIndex: 'data',
    render: (_value, record) => {
      const text = record.data;
      return <>{record.isRead ? <>{text}</> : <b>{text}</b>}</>
    }
  },
  {
    title: 'Действие',
    dataIndex: '',
    key: 'x',
    render: (_value, record) => { 
      return (<DeleteMessageButton record={record} />)
    }},
  {
    title: '',
    dataIndex: '',
    key: 'x',
    render: (_value, record : DataType) => {
      return (<>{record.isRead ? <CheckCircleTwoTone twoToneColor='#52c41a'/> : <CloseCircleTwoTone twoToneColor='#eb2f96'/>}</>)
    }},
]

export { columns }
