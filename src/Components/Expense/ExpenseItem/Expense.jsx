import React from 'react';

export default function Expense(props) {
    const {
        bg,
        name,
        sum,
        description,
        setIsItemSelected,
        expenseId,
        handleListItems,
        handleCompleteExpense,
        expenseComplete,
    } = props;

    return (
        <div
            className={'expense ' + bg}
            onClick={() => {
                setIsItemSelected(true);
                handleListItems(expenseId);
                handleCompleteExpense(expenseComplete);
            }}
        >
            <h3>{name}</h3>
            <h4>{sum} €</h4>
            <p>{description}</p>
        </div>
    );
}
