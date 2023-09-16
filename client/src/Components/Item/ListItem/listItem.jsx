import React from 'react';

export default function ListItem(props) {
    const { bg, name } = props;

    return (
        // PIN
        // bg uniquement sur les listItem
        <div className={'listitem ' + bg}>
            <h3>{name}</h3>
        </div>
    );
}
