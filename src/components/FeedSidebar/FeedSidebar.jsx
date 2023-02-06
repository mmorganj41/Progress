import './FeedSidebar.css'
import { Sidebar, Header, Message, Icon, Segment } from 'semantic-ui-react'
import React, {useEffect, useRef, useState} from 'react';
import Burger from '../Burger/Burger';
import { useOnClickOutside } from '../../hooks/hooks';
import ExperienceGraph from '../ExperienceGraph/ExperienceGraph';
import ReactDatePicker from 'react-datepicker';

export default function FeedSidebar({skills, totals, date, changeDate, createNotification}) {
    const [windowSize, setWindowSize] = useState(0);
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));



    useEffect(() => {
        updateWindowSize();
        window.addEventListener("resize", updateWindowSize);
        return () => {window.removeEventListener("resize", updateWindowSize)};
    }, []);

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
                    <ReactDatePicker selected={date} onChange={(data) => changeDate(data)} />
                </div>
                
                <Message compact icon color={color} className='FeedSideBar Message' >
                    <Icon name={icon} />
                    <Message.Content>
                    <Message.Header>Habits Completed</Message.Header>
                    
                        {totals.total ? `${totals.complete} / ${totals.total} Habits` : 'No Habits Shown'}
                    </Message.Content>
                    
                </Message>
                 
                <ExperienceGraph skills={skills} createNotification={createNotification}/>
                
            </Sidebar>
            
        </div>
    )
}