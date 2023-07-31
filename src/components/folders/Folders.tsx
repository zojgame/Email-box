import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import { Folder, SelectItem } from '..'
import { observer } from "mobx-react-lite"
import { emailsStore } from '../../store/store'

interface FoldersProps {
  folders: Folder[]
}

const Folders = observer(({folders} : FoldersProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
      setCollapsed(!collapsed);
  };

  const handleOnSelectFolder = (value : SelectItem) => {
    const folder = [...folders].find((folder) => folder.key === value.key)
    if(folder !== undefined){
      emailsStore.setCurrentFolder(folder)
      emailsStore.setSelectedEmails([])
    }
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <Menu theme="dark" 
          defaultSelectedKeys={[`1`]} 
          mode="inline"
          items={folders} 
          onSelect={handleOnSelectFolder}/>
    </Sider>
  )
})

export {Folders};
