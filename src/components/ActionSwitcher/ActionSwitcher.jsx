import React from "react";
import './ActionSwitcher.css';
import { Button, Icon } from "semantic-ui-react";

export default function ActionSwitcher({state, setState}) {


    return(
        <div className='ActionSwitcher ButtonGroup'>
            <Button disabled={/add/.test(state)} className='Button' onClick={() => setState('add')}><Icon name='add circle' /></Button>
            <Button disabled={/edit/.test(state)} className='Button' onClick={() => setState('edit')}><Icon name='minus circle' /></Button>
            <Button disabled={/delete/.test(state)} className='Button' onClick={() => setState('delete')}><Icon name='remove circle' /></Button>
        </div>
    )
}