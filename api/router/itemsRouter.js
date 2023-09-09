const express = require('express');
const itemsRouter = express.Router();
const { ObjectId } = require('mongodb');
const ItemsSchema = require('../schemas/subcategoriesSchema');
const { success, error } = require('../functions/functions');
// let { items } = useParams();

itemsRouter
    // READ ALL
    .get('/items/', async (req, res) => {
        try {
            const items = await ItemsSchema.find();
            res.status(200).json(success(items));
            console.log(items);
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // READ ONE
    .get('/items/:id', async (req, res) => {
        try {
            const singleCategory = await ItemsSchema.findById(
                req.params.id
            );
            if (!singleCategory) {
                throw new Error('Sous-catégorie inconnue');
            }

            res.status(200).json(success(singleCategory));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // INSERT ONE
    .post('/items', async (req, res) => {
        try {
            const { name, slug } = req.body;
            // Vérifie si la categorie est déjà crée
            const thisItem = await ItemsSchema.findOne({
                name,
            });

            if (thisItem && thisItem._id != req.params.id) {
                throw new Error('Sous-catégorie déjà créée');
            }

            // Créer une nouvelle sous-catégorie
            const itemToAdd = new ItemsSchema({
                name,
                slug,
            });

            const savedItem = await itemToAdd.save();
            res.status(200).json(success(savedItem));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // UPDATE ONE
    .put('/items/:id', async (req, res) => {
        try {
            const { name, slug } = req.body;

            let itemToUpdate = {
                name,
                slug,
            };

            // Vérifie si la categorie est déjà insérée
            const itemNameExist = await ItemsSchema.findOne({
                name,
            });
            if (itemNameExist && itemNameExist._id != req.params.id) {
                throw new Error('Sous-catégorie déjà insérée');
            }

            // Insère les nouvelles valeurs
            const updatedItem = await ItemsSchema.findOneAndUpdate(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: itemToUpdate,
                }
            );

            if (!updatedItem) {
                throw new Error(
                    "La sous-catégorie avec l'id : '" +
                        req.params.id +
                        "' est introuvable."
                );
            }

            res.status(200).json(success(itemToUpdate));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // DELETE ONE
    .delete('/items/:id', async (req, res) => {
        try {
            const deletedCount = await ItemsSchema.deleteOne({
                _id: new ObjectId(req.params.id),
            });

            if (deletedCount === 0) {
                throw new Error('Sous-catégorie introuvable');
            }

            res.status(200).json(success('Sous-catégorie supprimée'));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    });

module.exports = itemsRouter;
