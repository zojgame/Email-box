import { ArrowDownOutlined, DeleteOutlined, ExclamationCircleOutlined, FormOutlined, SendOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Folder } from "..";
import { emails } from "../../mock";
import { Message } from "..";

type MenuItem = Required<MenuProps>['items'][number]

const folderItems: MenuItem[] = [
    {label: 'Входящие', key: '1', icon: <ArrowDownOutlined />},
    {label: 'Черновик', key: '2', icon: <FormOutlined />},
    {label: 'Отправленные', key: '3', icon: <SendOutlined />},
    {label: 'Спам', key: '4', icon: <ExclamationCircleOutlined />},
    {label: 'Удаленные', key: '5', icon: <DeleteOutlined />},
]

const draftMessages = emails.filter((email) => email.type === Message.DRAFT)
const deletedMessages = emails.filter((email) => email.type === Message.DELETED)
const incomingMessages = emails.filter((email) => email.type === Message.INCOMING)
const sentMessages = emails.filter((email) => email.type === Message.SENT)
const spamMessages = emails.filter((email) => email.type === Message.SPAM)

const folders : Folder[] =[
    {label: 'Входящие', key: '1', icon: <ArrowDownOutlined />, messages: incomingMessages},
    {label: 'Черновик', key: '2', icon: <FormOutlined />, messages: draftMessages},
    {label: 'Отправленные', key: '3', icon: <SendOutlined />, messages: sentMessages},
    {label: 'Спам', key: '4', icon: <ExclamationCircleOutlined />, messages: spamMessages},
    {label: 'Удаленные', key: '5', icon: <DeleteOutlined />, messages: deletedMessages}
]

export {folderItems, folders};