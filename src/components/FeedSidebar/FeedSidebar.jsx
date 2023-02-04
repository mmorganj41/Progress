import './FeedSidebar.css'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import { Sidebar, Header, Message, Icon, Segment } from 'semantic-ui-react'
import React, {useEffect, useRef, useState} from 'react';
import Burger from '../Burger/Burger';
import { useOnClickOutside } from '../../hooks/hooks';
import Bar from '../Bar/Bar.jsx';

export default function FeedSidebar({levels, skills, totals, date, changeDate}) {
    const [windowSize, setWindowSize] = useState(0);
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));


    useEffect(() => {
        updateWindowSize();
        window.addEventListener("resize", updateWindowSize);
        return () => {window.removeEventListener("resize", updateWindowSize)};
    }, []);

    
    const levelsArray = levels?.map(skill => {
        console.log(skill);
        return (<Bar skill={skill} />)
    }) 



    const WINDOW_TRANSITION = 1825;

    const largeEnough = windowSize >= WINDOW_TRANSITION;

    const updateWindowSize = () => {
        setWindowSize(window.innerWidth);
    }

    function handleOpen() {
        setOpen(!open);
    }

    const color = (totals.complete === totals.total ? (!totals.total ? 'purple' : 'teal' ) : 'yellow');
    const icon = (totals.complete === totals.total ? (!totals.total ? 'times circle outline' : 'check circle outline' ) : 'arrow alternate circle right outline');
    return (
        <div ref={node} className='FeedSideBar'>
            <Burger open={open} handleOpen={handleOpen} displayCondition={!largeEnough} />
            <Sidebar 
                visible={open || largeEnough}
                animation="overlay"
                width="wide"
            >
                <div>
                    <Header>Selected Day:</Header>
                    <SemanticDatepicker clearable={false} value={date} onChange={(e, data) => changeDate(e, data)} />
                </div>
                
                <Message compact icon color={color} className='FeedSideBar Message' >
                    <Icon name={icon} />
                    <Message.Content>
                    <Message.Header>Habits Completed</Message.Header>
                    
                        {totals.total ? `${totals.complete} / ${totals.total} Habits` : 'No Habits Shown'}
                    </Message.Content>
                    
                </Message>
                <Segment>
                    {levelsArray}
                </Segment>
                    

                
            </Sidebar>
            
        </div>
    )
}