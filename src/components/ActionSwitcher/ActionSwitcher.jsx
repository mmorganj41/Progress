import React from "react";
import './ActionSwitcher.css';
import { Button, Icon, Message } from "semantic-ui-react";

export default function ActionSwitcher({state, setState}) {


    function handleClick(e) {
        let button = e.target.name
        if (state === button) setState('default')
        else {
            switch (button) {
                case 'add':
                    setState('add');
                    break;
                case 'edit':
                    setState('edit');
                    break;
                case 'delete':
                    setState('delete');
                    break;
            }
        }
    }

    return(
        <Message compact>
        <div className='ActionSwitcher ButtonGroup'>
            <Button circular icon compact color='teal' labelPosition='right' toggle={/add/.test(state)} name='add' className='Button' onClick={handleClick}><Icon name='add circle' />Add</Button>
            <Button circular icon compact color='teal' labelPosition='right' toggle={/edit/.test(state)} name='edit' className='Button' onClick={handleClick}><Icon name='minus circle' />Edit</Button>
        <Button circular icon compact color='teal' labelPosition='right' toggle={/delete/.test(state)} name='delete' className='Button' onClick={handleClick}><Icon name='remove circle' />Delete</Button>
        </div>
        </Message>
    )
}