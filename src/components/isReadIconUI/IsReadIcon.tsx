import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons"

interface IsReadIconProps {
    isRead : boolean,
}
/**
 * Компонент-оболочка для иконок, обозначающих прочитанность сообщения
 * @returns {JSX.Element} Возвращает компонент
 */
const IsReadIconUI = ({isRead} : IsReadIconProps) => {
  return (<>{isRead ? <CheckCircleTwoTone twoToneColor='#52c41a'/> : <CloseCircleTwoTone twoToneColor='#eb2f96'/>}</>)
}

export {IsReadIconUI} 