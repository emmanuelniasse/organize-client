import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import Category from '../../Components/Categories/Category/Category';
import CategoryCheckbox from '../../Components/Categories/CategoryCheckbox/CategoryCheckbox';
import ClassUpdateForm from '../../Components/Categories/CategoryUpdateForm/CartegoryUpdateForm';
import ClassAddForm from '../../Components/Categories/CategoryAddForm/CategoryAddForm';
import DeleteConfirm from '../../Components/Categories/CategoryDeleteConfirm/CategoryDeleteConfirm';

export default function Categories() {
    // States
    const [categories, setCategories] = useState([]);
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [items, setItems] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] =
        useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
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

    // Affiche le formulaire au clic sur le bouton "Ajouter une classe"
    const handleAdd = () => {
        setIsAddFormVisible(true);
    };

    // Cache le formulaire au clic sur le bouton "Annuler"
    const handleCancel = () => {
        setDeleteConfirm(false);
        setIsAddFormVisible(false);
        setIsUpdateFormVisible(false);
    };

    // Annule la selection d'item
    const handleCancelSelection = () => {
        setIsItemSelected(false);
        setItems([]);
    };

    // Supprime les categories
    const handleDelete = async () => {
        setDeleteConfirm(true);
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
                // Si l'élément n'est pas présent, on l'ajoute au tableau
                return [...prevItems, itemId];
            }
        });
    };

    return (
        <>
            <div className='categories'>
                <h1 className='categories__title title-page'>
                    Categories
                </h1>

                <div className='categories__buttons'>
                    {/* CRUD  */}
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
                    {!isAddFormVisible && !isItemSelected && (
                        <div
                            className='btn btn-add--plus'
                            onClick={handleAdd}
                        >
                            +
                        </div>
                    )}
                </div>

                {isAddFormVisible && (
                    <div className='categories__form-container'>
                        <ClassAddForm
                            setIsAddFormVisible={setIsAddFormVisible}
                            handleCancel={handleCancel}
                            setAreCategoriesFetched={
                                setAreCategoriesFetched
                            }
                        />
                    </div>
                )}

                {isUpdateFormVisible && (
                    <div className='categories__form-container'>
                        <ClassUpdateForm
                            setIsUpdateFormVisible={
                                setIsUpdateFormVisible
                            }
                            handleCancel={handleCancel}
                            items={items}
                            setItems={setItems}
                            setAreCategoriesFetched={
                                setAreCategoriesFetched
                            }
                        />
                    </div>
                )}

                {deleteConfirm && (
                    <div className='categories__modal'>
                        <DeleteConfirm
                            setDeleteConfirm={setDeleteConfirm}
                            handleCancel={handleCancel}
                            setAreCategoriesFetched={
                                setAreCategoriesFetched
                            }
                            setItems={setItems}
                            items={items}
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
                                <CategoryCheckbox
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
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
