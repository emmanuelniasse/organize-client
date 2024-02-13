import React from "react";

export default function ExpenseItem({
    expense,
    setIsItemSelected,
    handleListItems,
}) {
    const { bg, name, sum, description } = expense;
    return (
        <div
            className={"expense " + bg}
            onClick={() => {
                setIsItemSelected(true);
                handleListItems(expense);
            }}
        >
            <h3>{name}</h3>
            <h4>{sum > 0 && sum + " €"}</h4>
            <p>{description}</p>
        </div>
    );
}
