interface BoldMessageUIProps {
    isRead : boolean,
    text: string
}

/**
 * Компонент-оболочка для прочитанного текста
 * @returns {JSX.Element} Возвращает компонент
 */

const BoldMessageUI = ({isRead, text} : BoldMessageUIProps) => {
  return <>{isRead ? <>{text}</> : <b>{text}</b>}</>
}

export {BoldMessageUI} 