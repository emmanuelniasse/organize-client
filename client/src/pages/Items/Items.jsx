import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Components
import Item from '../../Components/Item/ListItem/listItem';
import Checkbox from '../../Components/Item/ItemCheckbox/ItemCheckbox';
import AddForm from '../../Components/Item/ItemAddForm/ItemAddForm';
import UpdateForm from '../../Components/Item/ItemUpdateForm/ItemUpdateForm';
import DeleteConfirmation from '../../Components/Item/ItemDeleteConfirmation/ItemDeleteConfirmation';

export default function Items() {
    // States
    const [subcategories1, setSubcategories] = useState([]);
    const [areSubcategoriesFetched, setAreSubcategoriesFetched] =
        useState(false);
    const [subcategoryName, setSubcategoryName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [items, setItems] = useState([]);
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    const [isUpdateFormVisible, setIsUpdateFormVisible] =
        useState(false);
    const [deleteConfirmation, setDeleteConfirmation] =
        useState(false);

    // Params
    let { category, subcategory } = useParams();

    // Récupération des sous-catégories en BD
    useEffect(() => {
        const getSubcategories = async () => {
            try {
                /**
                 * PIN : Voir pour externaliser ce bloc et le rendre disponible à toutes les pages
                 *
                 * getParents(category){
                 *  // get full category / subcategory names
                 * }
                 *
                 */
                // Get the full subcategory name from the slug
                const subcategoriesResponse = await axios.get(
                    `https://tst2-ten.vercel.app/${category}/subcategories`
                );

                const subcategoriesResult =
                    subcategoriesResponse.data.result;

                subcategoriesResult.forEach((subcategoryResult) => {
                    subcategoryResult.slug === subcategory &&
                        setSubcategoryName(subcategoryResult.name);
                });

                // Get the full category name from the slug
                const categoryResponse = await axios.get(
                    `https://tst2-ten.vercel.app//categories`
                );
                const categoriesResult = categoryResponse.data.result;
                categoriesResult.forEach((categoryResult) => {
                    categoryResult.slug === category &&
                        setCategoryName(categoryResult.name);
                });

                // Fin du block

                // API Request
                const itemsList = await axios.get(
                    `https://tst2-ten.vercel.app//${category}/${subcategory}/itemslist`
                );
                setSubcategories(itemsList.data.result);
                setAreSubcategoriesFetched(true);
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
                    (prevItemId) => prevItemId !== itemId
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
                <Link to='/'>Catégories</Link> {' > '}
                <Link to={'/' + category}>{categoryName}</Link>
            </ul>
            <h1 className='categories__title title-page'>
                {subcategoryName}
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
                        {items.length === 1 && (
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
                        collectionName='itemslist'
                        categoryName={categoryName}
                        subcategoryName={subcategory}
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
                        collectionName='itemslist'
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
                        collectionName='itemslist'
                    />
                </div>
            )}

            <ul className='categories__list'>
                {subcategories1.map((subcategory) => {
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
                            {/* <Link
                                to={`/${category}/${subcategory.slug}`}
                            > */}
                            <Item
                                name={subcategory.name}
                                setCategories={setSubcategories}
                            />
                            {/* </Link> */}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
