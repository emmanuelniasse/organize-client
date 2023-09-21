import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Components
import Category from '../../Components/Item/Item/Item';
import Checkbox from '../../Components/Item/ItemCheckbox/ItemCheckbox';
import AddForm from '../../Components/Item/ItemAddForm/ItemAddForm';
import UpdateForm from '../../Components/Item/ItemUpdateForm/ItemUpdateForm';
import DeleteConfirmation from '../../Components/Item/ItemDeleteConfirmation/ItemDeleteConfirmation';

export default function Subcategories() {
    // States
    const [subcategories, setSubcategories] = useState([]);
    const [areSubcategoriesFetched, setAreSubcategoriesFetched] =
        useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [items, setItems] = useState([]);
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    const [isUpdateFormVisible, setIsUpdateFormVisible] =
        useState(false);
    const [deleteConfirmation, setDeleteConfirmation] =
        useState(false);

    // Params
    let { category } = useParams();

    // Récupération des sous-catégories en BD
    useEffect(() => {
        const getSubcategories = async () => {
            try {
                const subcategories = await axios.get(
                    `${process.env.REACT_APP_API_URI}/${category}/subcategories/`
                );
                setSubcategories(subcategories.data.result);
                setAreSubcategoriesFetched(true);

                const categoryResponse = await axios.get(
                    `${process.env.REACT_APP_API_URI}/categories`
                );

                const categoriesResult = categoryResponse.data.result;
                categoriesResult.forEach((categoryResult) => {
                    categoryResult.slug == category &&
                        setCategoryName(categoryResult.name);
                });
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (subcategories) : ' +
                        err
                );
            }
        };
        if (!areSubcategoriesFetched) {
            getSubcategories();
        }
    }, [areSubcategoriesFetched]);

    // PIN : BUTTON ACTIONS à transformer en composant
    // Annule la selection d'item

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
        <div className='categories'>
            <ul className='breadcrumb'>
                <Link to='/'>Catégories</Link>
            </ul>
            <h1 className='categories__title title-page'>
                {categoryName}
            </h1>

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
                            setAreSubcategoriesFetched
                        }
                        collectionName='subcategories'
                        categoryName={categoryName}
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
                            setAreSubcategoriesFetched
                        }
                        collectionName='subcategories'
                    />
                </div>
            )}

            {deleteConfirmation && (
                <div className='categories__modal'>
                    <DeleteConfirmation
                        setDeleteConfirmation={setDeleteConfirmation}
                        handleCancel={handleCancel}
                        setAreDatasFetched={
                            setAreSubcategoriesFetched
                        }
                        setItems={setItems}
                        items={items}
                        collectionName='subcategories'
                    />
                </div>
            )}

            <ul className='categories__list'>
                {subcategories.map((subcategory) => {
                    let itemSelectedClass = items.includes(
                        subcategory._id
                    )
                        ? 'item-selected'
                        : '';

                    let checkboxClass = items.includes(
                        subcategory._id
                    )
                        ? 'category__checkbox__checked'
                        : '';
                    return (
                        <li
                            key={subcategory._id}
                            className={`categories__list__item ${itemSelectedClass}`}
                        >
                            <Checkbox
                                setIsItemSelected={setIsItemSelected}
                                checkboxClass={checkboxClass}
                                handleListItems={handleListItems}
                                categoryId={subcategory._id}
                            />
                            <Link
                                to={`/${category}/${subcategory.slug}`}
                            >
                                <Category
                                    name={subcategory.name}
                                    slug={subcategory.slug}
                                    setCategories={setSubcategories}
                                />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
