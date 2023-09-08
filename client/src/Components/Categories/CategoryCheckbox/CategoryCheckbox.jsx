import React from 'react';

export default function CategoryCheckbox(props) {
    let checkedClass;

    if (
        props.checkboxClass !== '' ||
        props.checkboxClass !== undefined
    ) {
        checkedClass = ' ' + props.checkboxClass;
    }

    return (
        <div
            className={'category__checkbox' + checkedClass}
            onClick={() => {
                props.setIsItemSelected(true);
                props.handleListItems(props.categoryId);
            }}
        ></div>
    );
}
