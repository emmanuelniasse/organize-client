import React from 'react';

export default function Item(props) {
    const { bg, name } = props;

    return (
        <div className={'item ' + bg}>
            <h3>{name}</h3>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing
                elit.
            </p>
        </div>
    );
}
