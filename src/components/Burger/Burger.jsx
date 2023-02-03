import React from 'react'
import styled from 'styled-components'

const StyledBurger = styled.div`
    display: block;
    position: fixed;
    top: 0%;
    left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    z-index: 150;
    margin-top: 75px;
    height: 26px;
    width: 32px;
    
        div {
        width: 2rem;
        height: 0.25rem;
        background: black; 
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px; 
    
        :first-child {
            transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
        }

        :nth-child(2) {
        opacity: ${({ open }) => open ? '0' : '1'};
        transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
        }

        :nth-child(3) {
        transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        }
    }  
`;

export default function Burger({open, handleOpen, displayCondition}) {
    if (displayCondition) {
            return (
        <StyledBurger open={open} onClick={handleOpen}>
            <div></div>
            <div></div>
            <div></div>
        </StyledBurger>
    )
    
    }

    return(null);

} 