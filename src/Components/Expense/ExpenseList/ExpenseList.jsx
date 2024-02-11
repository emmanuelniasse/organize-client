import React from "react";
import Expense from "../ExpenseItem/Expense";

export default function ExpenseList(props) {
    const { expense, setIsItemSelected, handleListItems, items } = props;
    let itemSelectedClass = items.includes(expense._id) ? "item-selected" : "";
    return (
        <li
            key={expense._id}
            className={`expenses__list__item ${itemSelectedClass}`}
        >
            <Expense
                key={expense._id}
                className={`expenses__list__item ${itemSelectedClass}`}
                name={expense.name}
                sum={expense.sum}
                description={expense.description}
                slug={expense.slug}
                setIsItemSelected={setIsItemSelected}
                handleListItems={handleListItems}
                expenseId={expense._id}
                expenseComplete={expense}
            />
        </li>
    );
}
