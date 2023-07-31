import { AddFolderButton, DeleteFolderButton, MoveEmailsButton } from ".."
import {observer} from 'mobx-react-lite'

const ControlPanel = observer(() => {
   return (
        <div className="panel-buttons" style={{ margin: '24px 24px 0 24px', display: 'flex', gap: '24px'}}>
            <MoveEmailsButton />
            <AddFolderButton />
            <DeleteFolderButton />
        </div>   
   );
});



export {ControlPanel} 