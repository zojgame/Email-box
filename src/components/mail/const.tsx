import { ColumnsType } from 'antd/es/table'
import { DataType, DeleteMessageButton, BoldMessageUI, IsReadIconUI } from '..'

// Заголовки колонок для таблицы сообщений
const columns: ColumnsType<DataType> = [
  {
    title: 'Автор',
    dataIndex: 'author',
    render: (_value, record) => <BoldMessageUI isRead={record.isRead} text={record.author}/>
  },
  {
    title: 'Превью',
    dataIndex: 'preview',
    width: '50%',
    render: (_value, record) => <BoldMessageUI isRead={record.isRead} text={record.preview}/>
  },
  {
    title: 'Дата',
    dataIndex: 'data',
    render: (_value, record) => <BoldMessageUI isRead={record.isRead} text={record.data}/>
  },
  {
    title: 'Действие',
    dataIndex: '',
    key: 'x',
    render: (_value, record) => <DeleteMessageButton record={record} />},
  {
    title: '',
    dataIndex: '',
    key: 'x',
    render: (_value, record : DataType) => <IsReadIconUI isRead={record.isRead} />},
]

export { columns }
