import React from 'react';

export default function ItemCheckbox(props) {
    const {
        checkboxClass,
        setIsItemSelected,
        handleListItems,
        categoryId,
    } = props;

    let checkedClass;

    if (checkboxClass !== '' || checkboxClass !== undefined) {
        checkedClass = ' ' + checkboxClass;
    }

    return (
        <div
            className={'item__checkbox' + checkedClass}
            onClick={() => {
                setIsItemSelected(true);
                handleListItems(categoryId);
            }}
        ></div>
    );
}
