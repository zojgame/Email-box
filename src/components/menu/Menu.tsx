import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Mail, Folders, folders, ControlPanel } from "..";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { emailsStore } from "../../store/store";

const { Header } = Layout;

const MenuComponent = observer(() => {
    useEffect(() => {
        emailsStore.setCurrentFolder(folders[0])
        emailsStore.setFolders(folders)
      }, []);

  return (
    <>
    <Layout style={{ minHeight: '100vh' }}>            
      <Folders folders={emailsStore.folders}/>
      <Layout>
        <Header style={{ padding: '0', color: 'white', textAlign: 'center' }}>Почта</Header>
        <Content style={{ margin: '0 16px' }}>
            <ControlPanel />
            <Mail emails={emailsStore.currentFolderMessages}/>
        </Content>
      </Layout>
    </Layout>
    
    </>
  )
})

export {MenuComponent};