import { AddFolderButton, DeleteFolderButton, MoveEmailsButton } from ".."
import {observer} from 'mobx-react-lite'

/**
 * Компонет-контейнер для панели с кнопками
 * @returns {JSX.Element} Возвращает компонент
 */

const ControlPanel = observer(() => {
   return (
        <div className="panel-buttons">
            <MoveEmailsButton />
            <AddFolderButton />
            <DeleteFolderButton />
        </div>   
   );
});



export {ControlPanel} 