import { ColumnsType } from 'antd/es/table';

const columns: ColumnsType<DataType> = [
  {
    title: 'Автор',
    dataIndex: 'author',
  },
  {
    title: 'Превью',
    dataIndex: 'preview',
    width: '50%'
  },
  {
    title: 'Дата',
    dataIndex: 'data',
  },
]

type DataType = {
    key: React.Key,
    author: string,
    preview: string,
    data: string,
    title: string,
    fullText: string
}

export { columns }
export type { DataType }
