import React from "react";
import './ActionSwitcher.css';
import { Button, Icon } from "semantic-ui-react";

export default function ActionSwitcher({state, setState}) {
    function handleClick(stateName) {
        setState(stateName)
    }

    return(
        <div className='ActionSwitcher ButtonGroup'>
            <Button disabled={state.match('add')} className='Button' onClick={() => setState('add')}><Icon name='add circle' /></Button>
            <Button disabled={state.match('edit')} className='Button' onClick={() => setState('edit')}><Icon name='minus circle' /></Button>
            <Button disabled={state.match('delete')} className='Button' onClick={() => setState('delete')}><Icon name='remove circle' /></Button>
        </div>
    )
}