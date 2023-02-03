import './FeedSidebar.css'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import { Sidebar, Header } from 'semantic-ui-react'
import React, {useEffect, useRef, useState} from 'react';
import Burger from '../Burger/Burger';
import { useOnClickOutside } from '../../hooks/hooks';

export default function FeedSidebar({skills, date, changeDate}) {
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


    return (
        <div ref={node} className='FeedSideBar'>
            <Burger open={open} handleOpen={handleOpen} displayCondition={!largeEnough} />
            <Sidebar 
                visible={open || largeEnough}
                animation="overlay"
                width="wide"
            >
                <Header>Selected Day:</Header>
                <SemanticDatepicker clearable={false} value={date} onChange={(e, data) => changeDate(e, data)} />
            </Sidebar>

        </div>
    )
}