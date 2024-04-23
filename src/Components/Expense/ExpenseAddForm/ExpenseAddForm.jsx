import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../Contexts/AuthContext.jsx";

export default function ExpenseAddForm(props) {
    const {
        setAreExpensesFetched,
        setIsAddFormVisible,
        setIsUpdateFormVisible,
        handleCancel,
        action,
        itemSelected,
        setItems,
        setCompleteItem,
        completeItem,
    } = props;

    const { setFlashMessage } = useAuth();

    const { register, handleSubmit } = useForm();

    // States
    const [categories, setCategories] = useState("");
    const [areCategoriesFetched, setAreCategoriesFetched] = useState(false);
    const [cookies, setCookie] = useCookies("");

    const onSubmit = async (newExpense) => {
        try {
            switch (action) {
                case "update":
                    await axios.put(
                        `${process.env.REACT_APP_API_URI}/expenses/${itemSelected}`, // TODO : au lieu de itemSelected => completeItem._id ?
                        newExpense,
                        {
                            method: "PUT",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${cookies.token}`,
                            },
                        }
                    );

                    setItems([]);
                    setCompleteItem([]);
                    setIsUpdateFormVisible(false);
                    setFlashMessage({
                        message: "Dépense modifiée",
                        type: "success",
                    });
                    break;

                default:
                    await axios.post(
                        `${process.env.REACT_APP_API_URI}/expenses`,
                        newExpense,
                        {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${cookies.token}`,
                            },
                        }
                    );
                    setIsAddFormVisible(false);
                    setFlashMessage({
                        message: "Dépense ajoutée",
                        type: "success",
                    });
                    break;
            }
            setAreExpensesFetched(false);
        } catch (error) {
            const errorMessage = error.response.data.message;
            setFlashMessage({
                message: errorMessage,
                type: "error",
            });
            throw new Error(error.msg);
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                let categoriesResult = await axios.get(
                    `${process.env.REACT_APP_API_URI}/categories`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${cookies.token}`,
                        },
                    }
                );

                setCategories(categoriesResult.data.result);
                setAreCategoriesFetched(true);
            } catch (error) {
                throw new Error(error.msg);
            }
        };

        if (!areCategoriesFetched) {
            getCategories();
        }
    }, [areCategoriesFetched]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form add-form">
                <div className="add-form__inputs-group">
                    <input
                        autoComplete="off"
                        {...register("name")}
                        placeholder={"Libellé"}
                        defaultValue={completeItem ? completeItem.name : ""}
                    />

                    {/* <select
                        {...register('category')}
                        defaultValue={selectedOption}
                        onChange={(e) =>
                            setSelectedOption(e.target.value)
                        }
                    >
                        <option
                            value={
                                completeItem &&
                                completeItem.category._id
                            }
                        >
                            {completeItem
                                ? completeItem.category.name
                                : '--- Catégorie de la dépense ---'}
                        </option>
                        {categories &&
                            categories.map((category) => (
                                <option
                                    value={category._id}
                                    key={category._id}
                                >
                                    {category.name} + {category._id}
                                </option>
                            ))}
                    </select> */}

                    <input
                        autoComplete="off"
                        type="number"
                        {...register("sum")}
                        placeholder={"Somme"}
                        defaultValue={completeItem ? completeItem.sum : ""}
                    />
                    <textarea
                        autoComplete="off"
                        {...register("description")}
                        rows="5"
                        cols="33"
                        placeholder={"Description"}
                        defaultValue={
                            completeItem ? completeItem.description : ""
                        }
                    />
                    <input type="hidden" value={action} />
                    <div className="btn-group">
                        <input
                            type="submit"
                            className={
                                "btn " +
                                (completeItem ? "btn-update" : "btn-add")
                            }
                            value={completeItem ? "Modifier" : "Ajouter"}
                        />
                        <input
                            className="btn btn-cancel"
                            type="button"
                            onClick={handleCancel}
                            value="Annuler"
                        />
                    </div>
                </div>
            </form>
        </>
    );
}
