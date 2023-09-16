import React from 'react';

export default function Item(props) {
    const { bg, name } = props;

    return (
        // PIN
        // bg uniquement sur les listItem
        <div className={'item ' + bg}>
            <h3>{name}</h3>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing
                elit.
            </p>
        </div>
    );
}
