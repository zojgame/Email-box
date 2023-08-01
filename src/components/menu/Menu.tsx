import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Mail, Folders, folders, ControlPanel, SearchField } from "..";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { emailsStore } from "../../store/store";
import { MailOutlined } from "@ant-design/icons";

const { Header } = Layout;
/**
 * Компонент-обертка для всех компонентов приложения,
 * в котором также происходит получение данных
 * @returns {JSX.Element} Возвращает массив сообщений
 */
const MenuComponent = observer(() => {
    useEffect(() => {
        emailsStore.setCurrentFolder(folders[0])
        emailsStore.setFolders(folders)
      }, []);

  return (
    <>
    <Layout className="layout-block">            
      <Folders folders={emailsStore.folders}/>
      <Layout>
        <Header className="header">Почта <MailOutlined className="mail"/></Header>
        <Content className="content-block" >
            <ControlPanel />
            <SearchField />
            <Mail emails={emailsStore.currentFolderMessages}/>
        </Content>
      </Layout>
    </Layout>
    
    </>
  )
})

export {MenuComponent};