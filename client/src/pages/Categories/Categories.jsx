import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import Category from '../../Components/Item/Item/Item';
import Checkbox from '../../Components/Item/ItemCheckbox/ItemCheckbox';
import AddForm from '../../Components/Item/ItemAddForm/ItemAddForm';
import UpdateForm from '../../Components/Item/ItemUpdateForm/ItemUpdateForm';
import DeleteConfirmation from '../../Components/Item/ItemDeleteConfirmation/ItemDeleteConfirmation';

export default function Categories() {
    // States
    const [categories, setCategories] = useState([]);
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [items, setItems] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] =
        useState(false);
    const [deleteConfirmation, setDeleteConfirmation] =
        useState(false);
    const [areCategoriesFetched, setAreCategoriesFetched] =
        useState(false);

    // Récupère les categories de la DB
    useEffect(() => {
        const getCategories = async () => {
            try {
                const categories = await axios.get(
                    'http://localhost:3000/categories/'
                );
                setCategories(categories.data.result);
                setAreCategoriesFetched(true);
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (categories) : ' + err
                );
            }
        };
        if (!areCategoriesFetched) {
            getCategories();
        }
    }, [areCategoriesFetched]);

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

    // Supprime les categories
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
            <div className='categories'>
                <h1 className='categories__title title-page'>
                    Catégories
                </h1>
                {/* 
                    PIN :
                    CRUD BUTTONS À TRANSFORMER EN COMPOSANT
                */}
                <div className='categories__buttons'>
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
                    <div className='categories__form-container'>
                        <AddForm
                            setIsAddFormVisible={setIsAddFormVisible}
                            handleCancel={handleCancel}
                            setAreDatasFetched={
                                setAreCategoriesFetched
                            }
                            collectionName='categories'
                        />
                    </div>
                )}

                {isUpdateFormVisible && (
                    <div className='categories__form-container'>
                        <UpdateForm
                            setIsUpdateFormVisible={
                                setIsUpdateFormVisible
                            }
                            handleCancel={handleCancel}
                            items={items}
                            setItems={setItems}
                            setAreDatasFetched={
                                setAreCategoriesFetched
                            }
                            collectionName='categories'
                        />
                    </div>
                )}

                {deleteConfirmation && (
                    <div className='categories__modal'>
                        <DeleteConfirmation
                            setDeleteConfirmation={
                                setDeleteConfirmation
                            }
                            handleCancel={handleCancel}
                            setAreDatasFetched={
                                setAreCategoriesFetched
                            }
                            setItems={setItems}
                            items={items}
                            collectionName='categories'
                        />
                    </div>
                )}

                <ul className='categories__list'>
                    {categories.map((category) => {
                        let itemSelectedClass = items.includes(
                            category._id
                        )
                            ? 'item-selected'
                            : '';

                        let checkboxClass = items.includes(
                            category._id
                        )
                            ? 'category__checkbox__checked'
                            : '';
                        return (
                            <li
                                key={category._id}
                                className={`categories__list__item ${itemSelectedClass}`}
                            >
                                <Checkbox
                                    setIsItemSelected={
                                        setIsItemSelected
                                    }
                                    checkboxClass={checkboxClass}
                                    handleListItems={handleListItems}
                                    categoryId={category._id}
                                />
                                <Link to={category.slug}>
                                    <Category
                                        name={category.name}
                                        slug={category.slug}
                                        setCategories={setCategories}
                                    ></Category>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
