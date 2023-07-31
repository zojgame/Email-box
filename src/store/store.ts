import { makeAutoObservable } from "mobx"
import type { Email, Folder } from "../components"

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
                return
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
        this.folders = [...updatedFolders]
    }

    moveMessages(folderId : string){
        const targetFolder = this.folders.find((folder) => folder.key === folderId)

        if(targetFolder){
            const filteredSelectedMails = [...this.selectedMails].filter((mail) => {
                const targetFolderMails = [...{...targetFolder}.messages]
                const isMailContains = targetFolderMails.find((folderMail) => folderMail.key === mail.key) !== undefined
                if(isMailContains){
                    return false
                }
                return true
            })

            const updatedTargetMessages : Email[] = [...{...targetFolder}.messages, ...filteredSelectedMails]
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
}


export const emailsStore = new EmailStore();