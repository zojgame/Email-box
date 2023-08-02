import { makeAutoObservable } from "mobx"
import type { Email, Folder } from "../components"
/**
 * Глобальное хранилище, с данными и функциями, 
 * позволяющими мутировать состояния приложения
 * @returns {EmailStore} При создании возвращает экзепляр класса
 */
export class EmailStore{
    folders : Folder[] = []
    selectedMails : Email[] = []
    currentFolderMessages : Email[] = []
    currentFolder : Folder  = {
        label: "",
        key: "",
        messages: []
    }

    constructor(){
        makeAutoObservable(this)
    }

    setFolders(folders: Folder[]){
        this.folders = folders
    }

    setSelectedEmails(emails: Email[]){ 
        this.selectedMails = [...emails]
    }

    setCurrentFolder(folder: Folder){
        this.currentFolder = folder
        this.currentFolderMessages = [...folder.messages]
    }

    searchMessage(messageId: string){

        [...this.folders].forEach((folder) => {
            
            const message = [...folder.messages].find((message) => message.key === messageId)

            if(message){
                this.currentFolderMessages = [message]
            }
        })
    }

    createFolder(folder: Folder){
        const updatedFolder = [...this.folders, folder]
        this.folders = updatedFolder
    }

    deleteFolder(){
        const updatedFolders = [...this.folders].filter((folder) => folder.key !== this.currentFolder.key)
        this.currentFolder = updatedFolders[0]
        this.currentFolderMessages = [...updatedFolders[0].messages]
        this.folders = [...updatedFolders]
    }

    moveMessages(folderId : string){
        const targetFolder = this.folders.find((folder) => folder.key === folderId)

        if(targetFolder){

            const updatedTargetMessages : Email[] = [...{...targetFolder}.messages, ...this.selectedMails]
            const updatedTargetFolder : Folder = { ...targetFolder, messages: updatedTargetMessages }

            const updatedSourceMessages : Email[]  = [...{...this.currentFolder}.messages].filter((message) => {
                const isMessageContain = [...this.selectedMails].find((mail) => mail.key === message.key) !== undefined;

                return !isMessageContain
            })
            const updatedSourceFolder : Folder = {...this.currentFolder, messages: [...updatedSourceMessages]}

            const updatedFolders = [...this.folders].map((folder) => {
                if(folder.key === updatedTargetFolder.key){
                    return updatedTargetFolder
                }
                else if(folder.key === updatedSourceFolder.key){
                    return updatedSourceFolder
                }
                else{
                    return folder
                } 
            })

            this.currentFolderMessages = [...updatedSourceMessages]
            this.folders = [...updatedFolders]
            this.selectedMails = []
            this.currentFolder = {...this.currentFolder, messages: [...updatedSourceMessages]}
        }
    }

    deleteMessage(messageId: React.Key){
        const filteredCurrentMessages = [...this.currentFolderMessages].filter((message) => message.key !== messageId)
        const filteredFolderMessages = [...{...this.currentFolder}.messages].filter((message) => message.key !== messageId)

        const updatedCurrentFolder = {...this.currentFolder, messages: filteredFolderMessages}

        const updatedFolders = [...this.folders].map((folder) => {
            const isUpdatedFolder = [...folder.messages].find((message) => message.key === messageId) !== undefined
            if(isUpdatedFolder){
                const updatedMessages = [...folder.messages].filter((message) => message.key !== messageId)
                const updatedFolder = {...folder, messages: [...updatedMessages]}
                return updatedFolder
            }
            
            return folder
        })

        this.currentFolder = updatedCurrentFolder
        this.currentFolderMessages = filteredCurrentMessages

        this.folders = [...updatedFolders]
    }

    setMessageRead(messageId: React.Key){
        const message = [...this.currentFolderMessages].find((message) => message.key === messageId)
        // if(message && !message.isRead){
        if(message && !message.isRead){
            // Обновление сообщений во всех папках
            const currentMessages = [...{...this.currentFolder}.messages]

            const updatedMessages : Email[] = currentMessages.map((mes) => {
                if(mes.key === message.key){
                    const updatedMessage : Email = {...message, isRead: true}
                    return updatedMessage
                }

                return mes
            })

            const updatedFolders = [...this.folders].map((folder) => {
                if(folder.key === this.currentFolder.key){
                    return {...this.currentFolder, messages: updatedMessages}
                }
                else{
                    return folder
                } 
            })

            // Обновление сообщений на текущей странице
            const updatedCurrentPageMessages = [...this.currentFolderMessages].map((mes) => {
                if(mes.key === message.key){
                    const updatedMessage : Email = {...message, isRead: true}
                    return updatedMessage
                }

                return mes
            })

            
            this.folders = updatedFolders
            this.currentFolderMessages = updatedCurrentPageMessages
            this.currentFolder = {...this.currentFolder, messages: updatedMessages}
        }
    }
}

export const emailsStore = new EmailStore();