
type Email = {
    key: React.Key,
    author: string,
    data: string,
    message: string,
    title: string,
    type?: Message,
    isRead: boolean
}

enum Message{
    INCOMING = 'INCOMING',
    DELETED = 'DELETED',
    DRAFT = 'DRAFT',
    SPAM = 'SPAM',
    SENT = 'SENT'    
}

type Folder = {
    label: string,
    key: React.Key,
    messages: Email[],
    icon?: React.ReactNode
}

type SelectItem = {
    key: React.Key,
    keyPath: string[],
    selectedKeys: string[],
}

export type { Folder, Email, SelectItem };
export {Message};