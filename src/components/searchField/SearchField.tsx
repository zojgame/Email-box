import { Select } from 'antd';
import { emails } from '../../mock';
import { Email, EmailOption } from '..';
import { emailsStore } from '../../store/store';
import { useState } from 'react';

function convertToOption(emails: Email[]) {
    const convertedEmails : EmailOption[] = emails.map((email) => {
        return {
            ...email,
            value: email.title,
            label: email.title,
            key: `${email.key}`
        }
    })

    return convertedEmails
}

const SearchField = () => {
    const emailOptions = convertToOption(emails)
    const [selectedEmail, setSelectedEmail] = useState<EmailOption>()

    const handleSelectChange = (_value: string, option: EmailOption | EmailOption[]) => {
        const emailOption = option as EmailOption
        const messageId = emailOption.key
        setSelectedEmail(emailOption)
        emailsStore.searchMessage(messageId)
    }

    const onCleanButtonClick = () => {
        const currentFolder = emailsStore.currentFolder
        emailsStore.setCurrentFolder(currentFolder)
        const selectedEmails = [...emailsStore.selectedMails].filter((mail) => mail.key !== selectedEmail?.key)
        emailsStore.setSelectedEmails([...selectedEmails])
        
    }

   return (
       <>
            <Select 
                allowClear
                showSearch
                className='select-field'
                placeholder="Искать по заголовку"
                onChange={handleSelectChange}
                options={emailOptions}
                onClear={onCleanButtonClick}
            >
            
            </Select>            
       </>
   );
};

export {SearchField} ;


