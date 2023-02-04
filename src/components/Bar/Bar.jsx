import React from 'react';

export default function Bar({levels}) {

    return(
        <div>
            <div>HP:&nbsp;</div>
            <div>
                <div className="outer-bar">
                    <div className="bar" data-value="<%= pokemon.currentHp %>"></div>
                </div>
            </div>
        </div>
    );
}