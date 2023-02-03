import './FeedSidebar.css'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import { Sidebar } from 'semantic-ui-react'
import React, {useEffect, useState} from 'react';

export default function FeedSidebar({date, changeDate}) {
    const [windowSize, setWindowSize] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        updateWindowSize();
        window.addEventListener("resize", updateWindowSize);
        return () => {window.removeEventListener("resize", updateWindowSize)};
    }, []);

    const updateWindowSize = () => {
        setWindowSize(window.innerWidth);
    }

    return (
        <div className='FeedSideBar'>

            <Sidebar 
                visible={windowSize >= 1650 || visible}
                animation="overlay"
            >
                <SemanticDatepicker clearable={false} value={date} onChange={(e, data) => changeDate(e, data)} />
            </Sidebar>

        </div>
    )
}