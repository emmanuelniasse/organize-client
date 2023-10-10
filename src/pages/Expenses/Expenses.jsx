import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import Expense from '../../Components/Item/Item/Item';
import Checkbox from '../../Components/Item/ItemCheckbox/ItemCheckbox';
import AddForm from '../../Components/Item/ItemAddForm/ItemAddForm';
import UpdateForm from '../../Components/Item/ItemUpdateForm/ItemUpdateForm';
import DeleteConfirmation from '../../Components/Item/ItemDeleteConfirmation/ItemDeleteConfirmation';

export default function Expenses() {
    // States
    const [expenses, setExpenses] = useState([]);
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [items, setItems] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] =
        useState(false);
    const [deleteConfirmation, setDeleteConfirmation] =
        useState(false);
    const [areExpensesFetched, setAreExpensesFetched] =
        useState(false);

    // Récupère les expenses de la DB
    useEffect(() => {
        const getExpenses = async () => {
            console.log(process.env.REACT_APP_API_URI);
            try {
                const expenses = await axios.get(
                    `${process.env.REACT_APP_API_URI}/expenses/`
                );
                setExpenses(expenses.data.result);
                setAreExpensesFetched(true);
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (expenses) : ' + err
                );
            }
        };
        if (!areExpensesFetched) {
            getExpenses();
        }
    }, [areExpensesFetched]);

    // PIN : BUTTON ACTIONS à transformer en composant

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
    // `prevItems` représente la valeur précédente de l'état items
    const handleListItems = (itemId) => {
        setItems((prevItems) => {
            if (prevItems.includes(itemId)) {
                // Si l'élément est déjà présent, on le supprime du tableau
                return prevItems.filter(
                    (prevItem) => prevItem !== itemId
                );
            } else {
                // Sinon on l'ajoute au tableau
                return [...prevItems, itemId];
            }
        });
    };

    return (
        <>
            <div className='expenses'>
                <h1 className='expenses__title title-page'>
                    Dépenses
                </h1>
                {/* 
                    PIN :
                    CRUD BUTTONS À TRANSFORMER EN COMPOSANT
                */}
                <div className='expenses__buttons'>
                    {!isAddFormVisible && !isItemSelected && (
                        <div
                            className='btn btn-add--plus'
                            onClick={handleAdd}
                        >
                            +
                        </div>
                    )}

                    {isItemSelected && (
                        <>
                            <div
                                className='btn-delete btn'
                                onClick={handleDelete}
                            >
                                Supprimer
                            </div>
                            {items.length == 1 && (
                                <div
                                    className='btn-update btn'
                                    onClick={handleUpdate}
                                >
                                    Modifier
                                </div>
                            )}

                            {!isUpdateFormVisible && (
                                <div
                                    className='btn-cancel btn'
                                    onClick={handleCancelSelection}
                                >
                                    Tout désélectionner
                                </div>
                            )}
                        </>
                    )}
                </div>

                {isAddFormVisible && (
                    <div className='expenses__form-container'>
                        <AddForm
                            setIsAddFormVisible={setIsAddFormVisible}
                            handleCancel={handleCancel}
                            setAreDatasFetched={setAreExpensesFetched}
                            collectionName='expenses'
                        />
                    </div>
                )}

                {isUpdateFormVisible && (
                    <div className='expenses__form-container'>
                        <UpdateForm
                            setIsUpdateFormVisible={
                                setIsUpdateFormVisible
                            }
                            handleCancel={handleCancel}
                            items={items}
                            setItems={setItems}
                            setAreDatasFetched={setAreExpensesFetched}
                            collectionName='expenses'
                        />
                    </div>
                )}

                {deleteConfirmation && (
                    <div className='expenses__modal'>
                        <DeleteConfirmation
                            setDeleteConfirmation={
                                setDeleteConfirmation
                            }
                            handleCancel={handleCancel}
                            setAreDatasFetched={setAreExpensesFetched}
                            setItems={setItems}
                            items={items}
                            collectionName='expenses'
                        />
                    </div>
                )}

                <ul className='expenses__list'>
                    {expenses.map((expense) => {
                        let itemSelectedClass = items.includes(
                            expense._id
                        )
                            ? 'item-selected'
                            : '';

                        let checkboxClass = items.includes(
                            expense._id
                        )
                            ? 'expense__checkbox__checked'
                            : '';
                        return (
                            <li
                                key={expense._id}
                                className={`expenses__list__item ${itemSelectedClass}`}
                            >
                                <Checkbox
                                    setIsItemSelected={
                                        setIsItemSelected
                                    }
                                    checkboxClass={checkboxClass}
                                    handleListItems={handleListItems}
                                    expenseId={expense._id}
                                />
                                <Link to={expense.slug}>
                                    <Expense
                                        name={expense.name}
                                        sum={expense.sum}
                                        slug={expense.slug}
                                        setExpenses={setExpenses}
                                    ></Expense>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
