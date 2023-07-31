import { AddFolderButton, DeleteFolderButton, MoveEmailsButton } from ".."
import {observer} from 'mobx-react-lite'

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