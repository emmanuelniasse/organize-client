import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
// Components
import AddForm from "../../Components/Expense/ExpenseAddForm/ExpenseAddForm";
import DeleteConfirmation from "../../Components/Expense/ItemDeleteConfirmation/ItemDeleteConfirmation";

// Icons
import SyncLoader from "react-spinners/SyncLoader";
import deleteIcon from "../../img/icons/deleteIcon.svg";
import editIcon from "../../img/icons/editIcon.svg";
import uncheckIcon from "../../img/icons/uncheckIcon.svg";

const ExpenseItem = React.lazy(() =>
    import("../../Components/Expense/ExpenseItem/ExpenseItem")
);

export default function Expenses() {
    // States
    const [expenses, setExpenses] = useState([]);
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [items, setItems] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [areExpensesFetched, setAreExpensesFetched] = useState(false);
    const [completeItem, setCompleteItem] = useState([]);
    const [cookies, setCookie] = useCookies("token");

    // Récupère les dépenses de la DB
    const getExpenses = async () => {
        try {
            const expensesResult = await axios.get(
                `${process.env.REACT_APP_API_URI}/expenses`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );
            setExpenses(expensesResult.data.result);
            setAreExpensesFetched(true);
        } catch (err) {
            // TODO : Je ne veux pas logguer l'erreur, je veux la remonter à l'utilisateur
            console.log("Erreur lors de la requête (expenses) : " + err);
        }
    };

    useEffect(() => {
        if (!areExpensesFetched) {
            getExpenses();
        }
    }, [areExpensesFetched]);

    // TODO : BUTTON ACTIONS à transformer en composant
    // Affiche le formulaire au clic sur le bouton "Ajouter une classe"
    const handleAdd = () => {
        setIsAddFormVisible(true);
    };

    // Cache le formulaire au clic sur le bouton "Annuler"
    const handleCancel = () => {
        setDeleteConfirmation(false);
        setIsAddFormVisible(false);
        setIsUpdateFormVisible(false);
    };

    const handleCancelSelection = () => {
        setIsItemSelected(false);
        setItems([]);
        setCompleteItem([]);
    };

    // Supprime les expenses
    const handleDelete = async () => {
        setDeleteConfirmation(true);
    };

    // Modifie la classe
    const handleUpdate = async () => {
        setIsUpdateFormVisible(true);
    };

    // Cache les boutons CRUD dans le cas où aucun items n'est sélectionné
    useEffect(() => {
        items.length < 1 && setIsItemSelected(false);
    }, [items]);

    // Stock l'id des items sélectionnés
    // `previousItems` représente la valeur précédente de l'état items
    const handleListItems = (completeExpense) => {
        setItems((previousItems) => {
            if (previousItems.includes(completeExpense._id)) {
                // Si l'élément est déjà présent, on le supprime du tableau
                return previousItems.filter(
                    (prevItem) => prevItem !== completeExpense._id
                );
            } else {
                // Sinon on l'ajoute au tableau
                return [...previousItems, completeExpense._id];
            }
        });

        setCompleteItem((previousCompleteItems) => {
            if (previousCompleteItems.includes(completeExpense)) {
                // Si l'élément est déjà présent, on le supprime du tableau
                return previousCompleteItems.filter(
                    (prevCompleteItem) => prevCompleteItem !== completeExpense
                );
            } else {
                // Sinon on l'ajoute au tableau
                return [...previousCompleteItems, completeExpense];
            }
        });
    };
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#142b5c",
    };
    return (
        <>
            <div className="expenses">
                <h1 className="expenses__title title-page">Dépenses</h1>
                {/* 
                    TODO :
                    CRUD BUTTONS À TRANSFORMER EN COMPOSANT
                */}
                <div className="expenses__buttons">
                    <div className="btn btn-add--plus" onClick={handleAdd}>
                        +
                    </div>
                    {isItemSelected && (
                        <>
                            {!isUpdateFormVisible && (
                                <div
                                    className="btn-cancel btn"
                                    onClick={handleCancelSelection}
                                >
                                    <img
                                        src={uncheckIcon}
                                        alt="update-icon"
                                        className="btn-icon"
                                    />
                                </div>
                            )}
                            <div
                                className="btn-delete btn"
                                onClick={handleDelete}
                            >
                                <img
                                    src={deleteIcon}
                                    alt="delete-icon"
                                    className="btn-icon"
                                />
                            </div>
                            {items.length === 1 && (
                                <div
                                    className="btn-update btn"
                                    onClick={handleUpdate}
                                >
                                    <img
                                        src={editIcon}
                                        alt="update-icon"
                                        className="btn-icon"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

                {isAddFormVisible && (
                    <div className="expenses__form-container">
                        <AddForm
                            setIsAddFormVisible={setIsAddFormVisible}
                            handleCancel={handleCancel}
                            setAreExpensesFetched={setAreExpensesFetched}
                            action="add"
                        />
                    </div>
                )}

                {isUpdateFormVisible && (
                    <div className="expenses__form-container">
                        <AddForm
                            setIsUpdateFormVisible={setIsUpdateFormVisible}
                            handleCancel={handleCancel}
                            setAreExpensesFetched={setAreExpensesFetched}
                            action="update"
                            setItems={setItems}
                            setCompleteItem={setCompleteItem}
                            itemSelected={items} // TODO : itemSelected != completeItem (je souhaite avoir completeItem._id)
                            completeItem={completeItem[0]}
                        />
                    </div>
                )}

                {deleteConfirmation && (
                    <div className="expenses__modal">
                        <DeleteConfirmation
                            setDeleteConfirmation={setDeleteConfirmation}
                            handleCancel={handleCancel}
                            setAreExpensesFetched={setAreExpensesFetched}
                            setItems={setItems}
                            setCompleteItem={setCompleteItem}
                            items={items}
                        />
                    </div>
                )}

                <Suspense
                    fallback={
                        <div className="justify-and-align-center  my-1">
                            <SyncLoader
                                color={"#142b5c"}
                                cssOverride={override}
                                size={8}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    }
                >
                    <ul className="expenses__list">
                        {expenses.map((expense) => {
                            let itemSelectedClass = items.includes(expense._id)
                                ? "item-selected"
                                : "";

                            return (
                                // TODO : passer la class item-selected à ExpenseItem pour éviter d'avoir un probleme d'affichage
                                <li
                                    key={expense._id}
                                    className="expenses__list__item"
                                    // className={`expenses__list__item ${itemSelectedClass}`}
                                >
                                    <ExpenseItem
                                        expense={expense}
                                        setIsItemSelected={setIsItemSelected}
                                        handleListItems={handleListItems}
                                        itemSelectedClass={itemSelectedClass}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </Suspense>
            </div>
        </>
    );
}
